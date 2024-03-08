import { z } from "zod";
import {
	DigivolutionOptions, GameCard,
	registerNewDigimon,

} from "../utils";
import { CardColor, DigimonAttribute, DigimonForm, DigimonLevel, DigimonType } from "../enums";
import { isInPlay, isTopOfStack, nameContains, nameIs } from "../tests";
import { pipe } from "fp-ts/function";
import { map } from "fp-ts/Option";
import { chainModifiers, inheritableEffect, inPlay, mainEffect, oncePerTurn, whenTopOfStack } from "../scriptModifiers";

// Huckmon BT13-009
// LVL3
// Rookie | Data | Mini Dragon
// DP: 2 000
// PC: 3
// DC: 0 (on red lvl2)
// Effect: [Your Turn] When you play a digimon with [Sistermon] in its name, this
//      digimon may digivolve into [BaoHuckmon] in the hand without paying the cost.
// Inheritable: [Your Turn][Once Per Turn] When you play a digimon with [Sistermon]
//      in its name, gain 1 memory.

export const bt13_009HuckmonStateSchema = () => z.object({
	activatedThisTurn: z.boolean(),
});

export type BT13_009_HuckmonState = z.infer<ReturnType<typeof bt13_009HuckmonStateSchema>>;

export default registerNewDigimon<BT13_009_HuckmonState>({
	id: "BT13-009",
	name: "Huckmon",
	level: DigimonLevel.ROOKIE,
	colors: [CardColor.RED],
	dp: 2_000,
	playCost: 3,
	digivolveCosts: [{
		color: CardColor.RED,
		level: DigimonLevel.EGG,
		cost: 0,
	}],
	digimonForms: [DigimonForm.ROOKIE],
	digimonAttributes: [DigimonAttribute.DATA],
	digimonTypes: [DigimonType.MINI_DRAGON],
	////
	initialLocalState: {
		activatedThisTurn: false,
	},
	validateLocalState(state) {
		return bt13_009HuckmonStateSchema().parse(state);
	},
}, ctx => {
	ctx.thisPlayerEvents.onPlay(card => {
		chainModifiers(ctx, [
			inPlay,
			mainEffect,
		], () => {
			// We only care about cards that contain [Sistermon] being played.
			// Skip everything eles
			if (!nameContains(card, "Sistermon")) {
				return;
			}

			const digivolutionOptions = {
				ignoreCost: true,
			} as const satisfies Partial<DigivolutionOptions>;

			// We query the hand for [BaoHuckmon]s that we can digivolve into
			const getBaoHuckmons = () => ctx.query.hand()
				.filter(card => nameIs(card, "BaoHuckmon", {
					caseInsensitive: true,
				}))
				.filter(card => ctx.query.canDigivolveInto(card, digivolutionOptions))
				.toArray();

			ctx.actions.queueOptionalAction<GameCard<any>[]>("Digivolve into BaoHuckmon?", {
				computeState: () => getBaoHuckmons(),
				canExecute: baohuckmons => {
					return baohuckmons.length > 0
						&& isInPlay(ctx.card)
						&& isTopOfStack(ctx.card);
				},
				action: baohuckmons => {
					pipe(
						ctx.actions.pickOne(baohuckmons),
						map(card => {
							ctx.actions.digivolveInto(card, digivolutionOptions);
						})
					);
				},
			});
		});

		chainModifiers(ctx, [
			inPlay,
			inheritableEffect,
			oncePerTurn.via("activatedThisTurn"),
		], () => {
			if (!nameContains(card, "Sistermon")) {
				return;
			}

			ctx.actions.queueMandatoryAction("Gain 1 memory", {
				canExecute: () => isInPlay(card) && !isTopOfStack(card),
				action: () => {
					ctx.actions.gainMemory(1);
				},
			});
		});
	});
});

