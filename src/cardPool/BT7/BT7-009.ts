import {
	CardColor,
	DigimonAttribute,
	DigimonForm,
	DigimonLevel,
	DigimonTrait,
	EffectTrigger,
	EffectType,
} from "@/cardDefs/enums";
import { partitionCardsContainingName } from "@/cardDefs/utils";

// Huckmon BT7-009
// Red
// LVL3
// Rookie | Data | Mini Dragon
// DP: 3 000
// PC: 4
// DC: 0 (on red lvl2)
// Inheritable: [When Attacking][Once Per Turn] Reveal the top 5 cards of your deck.
//      Add all cards with [Sistermon] in their names among them to your hand.
//      Place the remaining cards at the bottom of your deck in any order

export default registerDigimonCard({
	id: "BT7-009",
	names: ["Huckmon"],
	colors: [CardColor.RED],
	level: DigimonLevel.ROOKIE,
	dp: 3_000,
	playConditions: [{ playCost: 4 }],
	digivolutionConditions: [
		{
			color: CardColor.RED,
			level: DigimonLevel.EGG,
			cost: 0,
		},
	],
	digimonForms: [DigimonForm.ROOKIE],
	digimonAttributes: [DigimonAttribute.DATA],
	traits: [DigimonTrait.MINI_DRAGON],
	cardText: {
		security: "",
		main: "",
		inheritable: `
			@[When Attacking]@ @(Once Per Turn)@ Reveal the top 5 cards of your deck. Add all cards with #[Sistermon]# in their names among them to your hand. Place the remaining cards at the bottom of your deck in any order.
		`,
	},
	effects: {
		security: [],
		trash: [],
		main: [],
		inheritable: [
			{
				type: EffectType.TRIGGERED,
				trigger: EffectTrigger.WHEN_ATTACKING,
				oncePerTurn: true,
				script: ctx => {
					ctx.actions.queueMandatoryAction("Reveal top 5 deck, add all sistermons", async () => {
						const revealedCards = await ctx.actions.publicRevealTopDeck(5);
						const { ok, ko } = partitionCardsContainingName(revealedCards, "Sistermon");

						await ctx.actions.addToHand(ok);
						await ctx.actions.bottomDeckPickOrder(ko);
					});
				},
			},
		],
	},
});
