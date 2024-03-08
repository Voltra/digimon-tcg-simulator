import { GameCard, Player, registerNewDigimon } from "../utils";
import { CardColor, DigimonAttribute, DigimonLevel, DigimonForm, DigimonType } from "../enums";
import { z } from "zod";
import { belongsToPlayer, isInRaising, isSameCardAs, nameIs } from "../tests";
import { chainModifiers, inPlay, mainEffect, whenTopOfStack } from "../scriptModifiers";

// Diaboromon P-016
// LVL6
// Mega | Unknown | Unidentified
// DP: 11 000
// PC: 11
// DC: 3 (on black lvl5)
// Effect: [Your Turn] For each "Diaboromon" you have in play, this Digimon gets <Sec+1>
// Inheritable: N.A.

export const p016DiaboromonStateSchema = () => z.object({
	diaboroCount: z.number().int(),
});

export type P016_DiaboromonState = z.infer<ReturnType<typeof p016DiaboromonStateSchema>>;

export default registerNewDigimon<P016_DiaboromonState>({
	id: "P-016",
	name: "Diaboromon",
	level: DigimonLevel.MEGA,
	colors: [CardColor.BLACK],
	dp: 11_000,
	playCost: 11,
	digivolveCosts: [
		{
			level: DigimonLevel.ULTIMATE,
			color: CardColor.BLACK,
			cost: 3,
		},
	],
	digimonForms: [DigimonForm.MEGA],
	digimonAttributes: [DigimonAttribute.UNKNOWN],
	digimonTypes: [DigimonType.UNIDENTIFIED],
	////
	initialLocalState: {
		diaboroCount: 0,
	},
	validateLocalState: (state) => {
		return p016DiaboromonStateSchema().parse(state);
	},
}, ctx => {
	// Our goal is to properly maintain the right amount of sec pluses.
	// We use a helper function to determine if a certain card is another of our diaboromons.
	// If it is, we can stack up

	const isAnotherDiaboromonOfOurs = (otherCard: GameCard<any>) => nameIs(otherCard, ctx.meta.name) && belongsToPlayer(otherCard, ctx.card.owner);

	const incr = () => {
		// When incrementing, we queue a sec+1 and update our local state info.
		// This helps us cleanup properly on turn end, or deletion, etc...
		ctx.card.stack.secAtkPlus();
		ctx.card.localState.diaboroCount += 1;
	};

	const decr = () => {
		if (ctx.card.localState.diaboroCount === 0) {
			// We do not decrement if the diaboroCount is at 0.
			// This is because you cannot have "negative amounts" of digimon on the field
			return;
		}

		// When decrementing, we queue a sec-1 and update our local state info.
		// This helps us cleanup properly on turn end, or deletion, etc...
		ctx.card.stack.secAtkMinus();
		ctx.card.localState.diaboroCount -= 1;
	};

	const reset = () => {
		// We can consider this branch as a onTurnEnd handler.
		// We retrieve the current diaboromon counter from the local state,
		// so we can do the manual update. If the counter is positive,
		// we need to remove that many pluses. If it's negative
		// (which shouldn't happen, but we're being safe) we need to add that
		// many pluses. Basically: we remove what we had left.

		const { diaboroCount } = ctx.card.localState;

		if (diaboroCount > 0) {
			ctx.card.stack.secAtkMinus(diaboroCount);
		} else if (diaboroCount < 0) {
			// This should not happen. The counter should not be negative.
			// Just for safety, we'll handle that and correct anyway.
			// The scope of the local state is that card instance specifically.
			// Which means that whatever happened to make the counter negative
			// is strictly this script's fault.
			ctx.card.stack.secAtkPlus(Math.abs(diaboroCount));
		}

		// We reset the counter on turn end so that when our next turn starts
		// we have a blank slate to work with. It can also avoid weird double
		// cleanup issues (so bugs in this regard would be harder to detect)
		ctx.card.localState.diaboroCount = 0;
	};

	const forceRecomputeCount = () => {
		const pluses = ctx.query.field()
			.filter(c => nameIs(c, ctx.meta.name))
			.filterNot(c => isSameCardAs(c, ctx.card))
			.count();

		ctx.card.localState.diaboroCount = pluses;

		if (pluses > 0) {
			ctx.card.stack.secAtkPlus(pluses);
		}
	};

	ctx.events.onAnyTurnStart(newTurnPlayer => {
		chainModifiers(ctx, [
			inPlay,
			mainEffect,
		], () => {
			if (!belongsToPlayer(ctx.card, newTurnPlayer)) {
				// We can consider this branch as a onTurnEnd handler.
				// We retrieve the current diaboromon counter from the local state,
				// so we can do the manual update. If the counter is positive,
				// we need to remove that many pluses. If it's negative
				// (which shouldn't happen, but we're being safe) we need to add that
				// many pluses. Basically: we remove what we had left.

				reset();
			} else {
				// When our turn start, reset the local state and do a manual lookup.
				// Let's say our stack currently has -2 in sec, and we have 4 diaboromon.
				// This means we'll have 2 at the end. But we need to know we added 4
				// to be able to remove them and get back to -2 at the end of the turn.
				// Which is why we'll directly set the diaboroCount to the count of pluses.

				forceRecomputeCount();
			}
		});
	});

	ctx.events.onPlayAny(card => {
		chainModifiers(ctx, [
			inPlay,
			mainEffect,
		], () => {
			if (!isAnotherDiaboromonOfOurs(card)) {
				return;
			}

			// When a diaboromon is hard played (e.g. tokens)
			// we increment our number of security attacks.
			incr();
		});
	});

	const whenLeaving = (card: GameCard<any>) => {
		chainModifiers(ctx, [
			inPlay,
			mainEffect,
		], () => {
			if (!isAnotherDiaboromonOfOurs(card)) {
				return;
			}

			// When a diaboromon leaves the field (e.g. destroyed, dies in battle, bounce)
			// we decrement our number of security attacks.
			decr();
		});
	};

	ctx.events.onDestroyAny(whenLeaving);
	ctx.events.onAnyDie(whenLeaving);
	ctx.events.onBounceAnyToHand(whenLeaving);
	ctx.events.onBounceAnyToDeck(whenLeaving);

	ctx.events.onDigivolveAny((fromCard, toCard) => {
		if (isInRaising(fromCard)) {
			// Cards in raising do not affect our counter
			return;
		}

		chainModifiers(ctx, [
			inPlay,
			mainEffect,
		], () => {
			if (isAnotherDiaboromonOfOurs(fromCard)) {
				// We digivolved from a diaboromon, thus decrement the counter.
				decr();
			}

			if (isAnotherDiaboromonOfOurs(toCard)) {
				// We digivolved into a diaboromon, thus increment the counter.
				incr();
			}
		});

		if (isSameCardAs(fromCard, ctx.card)) {
			reset();
		}
	});

	ctx.events.onDeDigivolveAny((fromCard: GameCard<any>, toCard: GameCard<any>) => {
		chainModifiers(ctx, [
			inPlay,
			mainEffect,
		], () => {
			if (isInRaising(fromCard)) {
				// Cards in raising do not affect our counter
				return;
			}

			if (isAnotherDiaboromonOfOurs(fromCard)) {
				// The de-digivolution "removed" a diaboromon,
				// thus decrement the counter
				decr();
			}

			if (isAnotherDiaboromonOfOurs(toCard)) {
				// The de-digivolution reached a diaboromon,
				// thus increment the counter
				incr();
			}

			if (isSameCardAs(toCard, ctx.card)) {
				// We just de-digivolved into diaboromon
				// thus fully recompute the counter's value
				forceRecomputeCount();
			}
		});
	});

	ctx.events.onPromoteAny(card => {
		chainModifiers(ctx, [
			inPlay,
			mainEffect,
		], () => {
			if (isAnotherDiaboromonOfOurs(card)) {
				// A diaboromon that was sitting idle in raising
				// just got promoted onto the field! Hurray,
				// increment the counter!
				incr();
			}

			if (isSameCardAs(card, ctx.card)) {
				// We just got promoted
				forceRecomputeCount();
			}
		});
	});
});
