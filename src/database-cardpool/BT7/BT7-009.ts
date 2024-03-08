import {
	GameCard,
	Player,
	registerNewDigimon,
} from "../utils";
import { z } from "zod";
import { CardColor, DigimonAttribute, DigimonForm, DigimonLevel, DigimonType } from "../enums";
import { partitionCardsContainingName } from "../queries";
import { belongsToPlayer, isInPlay, isSameCardAs, isTopOfStack } from "../tests";
import { bindModifier, chainModifiers, inheritableEffect, inPlay, oncePerTurn } from "../scriptModifiers";

// Huckmon BT7-009
// LVL3
// Rookie | Data | Mini Dragon
// DP: 3 000
// PC: 4
// DC: 0 (on red lvl2)
// Effect: N.A.
// Inheritable: [When Attacking][Once Per Turn] Reveal the top 5 cards of your deck.
//      Add all cards with [Sistermon] in their names among them to your hand.
//      Place the remaining cards at the bottom of your deck in any order

export const bt7_009HuckmonStateSchema = () => z.object({
	activatedThisTurn: z.boolean(),
});

export type BT7_009_HuckmonState = z.infer<ReturnType<typeof bt7_009HuckmonStateSchema>>;

export default registerNewDigimon<BT7_009_HuckmonState>({
	id: "BT7-009",
	name: "Huckmon",
	level: DigimonLevel.ROOKIE,
	colors: [CardColor.RED],
	dp: 3_000,
	playCost: 4,
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
		return bt7_009HuckmonStateSchema().parse(state);
	},
}, ctx => {
	ctx.thisCardEvents.onAttacking(() => {
		chainModifiers(ctx, [
			inPlay,
			inheritableEffect,
			oncePerTurn.via("activatedThisTurn"),
		], () => {
			ctx.actions.queueMandatoryAction("Reveal top 5 deck, add all sistermons", {
				canExecute: () => isInPlay(ctx.card) && !isTopOfStack(ctx.card),
				action: () => {
					const revealedCards = ctx.actions.revealTopDeck(5);

					const partitioned = partitionCardsContainingName(revealedCards, "Sistermon");

					ctx.actions.addToHand(partitioned.ok);
					ctx.actions.bottomDeckPickOrder(partitioned.ko);
				},
			});
		});
	});

	ctx.thisPlayerEvents.onTurnEnd(() => {
		// When our turn ends, it's time to reset our OPT
		// effects. This includes the inheritable one.
		ctx.card.localState.activatedThisTurn = false;
	});
});
