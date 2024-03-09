import { z } from "zod";
import { registerNewDigimon } from "../utils";
import { CardColor, CardType, DigimonAttribute, DigimonForm, DigimonLevel, DigimonType } from "../enums";
import { belongsToPlayer, isInPlay, isSameCardAs, isTopOfStack, nameContains } from "../tests";
import { chainModifiers, inPlay, mainEffect, oncePerTurn } from "../scriptModifiers";
import { gainBlitzForTheTurn } from "../routines";
import { pipe } from "fp-ts/function";
import { map } from "fp-ts/Option";

// Jesmon ST12-10
// LVL6
// Mega | Data | Holy Warrior / Royal Knight
// DP: 12 000
// PC: 12
// DC: 4 (on red lvl5)
// Effect: [When Digivolving] <Blitz>
//      [When Attacking] You may play 1 card with [Sistermon] in its name from your
//      hand without paying its memory cost.
//      [Your Turn] [Once Per Turn] When you play another digimon by an effect,
//      this digimon gets +3000 DP and gains <Security Atk +1> for the turn.
// Inheritable: N.A.

export const st12_10JesmonStateSchema = () => z.object({
	activatedThisTurn: z.boolean(),
});

export type ST12_10_JesmonState = z.infer<ReturnType<typeof st12_10JesmonStateSchema>>;

const atkBoost = 3_000;

export default registerNewDigimon<ST12_10_JesmonState>({
	id: "ST12-10",
	name: "Jesmon",
	level: DigimonLevel.MEGA,
	colors: [CardColor.RED],
	dp: 12_000,
	playCost: 12,
	digivolveCosts: [{
		color: CardColor.RED,
		level: DigimonLevel.ULTIMATE,
		cost: 4,
	}],
	digimonForms: [DigimonForm.MEGA],
	digimonAttributes: [DigimonAttribute.DATA],
	digimonTypes: [DigimonType.HOLY_WARRIOR, DigimonType.ROYAL_KNIGHT],
	////
	initialLocalState: {
		activatedThisTurn: false,
	},
	validateLocalState(state) {
		return st12_10JesmonStateSchema().parse(state);
	},
}, ctx => {
	// When digivolving
	ctx.events.onDigivolveAny((fromCard, toCard) => {
		chainModifiers(ctx, [
			inPlay,
			mainEffect,
		], () => {
			if (!isSameCardAs(toCard, ctx.card)) {
				return;
			}

			gainBlitzForTheTurn(ctx);
		});
	});

	// When attacking
	ctx.thisCardEvents.onAttacking(() => {
		chainModifiers(ctx, [
			inPlay,
			mainEffect,
		], () => {
			// We query the hand for any digimon containing [Sistermon]
			const getSistermonCards = () => ctx.query.hand()
				.filter(card => card.type === CardType.DIGIMON)
				.filter(card => nameContains(card, "sistermon", {
					alreadyLowerCased: true,
				}))
				.toArray();

			ctx.actions.queueOptionalAction<ReturnType<typeof getSistermonCards>>("Jesmon: Play a digimon that [Sistermon] in its name from hand?", {
				computeState: () => getSistermonCards(),
				canExecute: sistermons => sistermons.length > 0 && isInPlay(ctx.card),
				action: sistermons => {
					pipe(
						ctx.actions.pickOne(sistermons),
						map(sistermon => ctx.actions.playByEffect(sistermon, {
							playedBy: ctx.card,
							ignoreCost: true,
						}))
					)
				},
			});
		});
	});

	// When playing a digimon
	ctx.thisPlayerEvents.onPlay(card => {
		chainModifiers(ctx, [
			inPlay,
			mainEffect,
			oncePerTurn.via("activatedThisTurn"),
		], () => {
			if (card.type !== CardType.DIGIMON) {
				return;
			}

			ctx.card.stack.gainDP(atkBoost);
			ctx.card.stack.secAtkPlus();
		});
	});

	// Reset local state
	ctx.thisPlayerEvents.onTurnEnd(() => {
		if (ctx.card.localState.activatedThisTurn) {
			ctx.card.stack.secAtkMinus();
			ctx.card.stack.loseDP(atkBoost);
		}

		ctx.card.localState.activatedThisTurn = false;
	});
});
