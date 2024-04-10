import {
	CardColor, CardTrait, CardType,
	DigimonAttribute,
	DigimonForm,
	DigimonLevel,
	DigimonTrait, EffectTrigger,
	EffectTurnCondition, EffectType,
} from "@/cardDefs/enums";
import { pipe } from "fp-ts/function";
import { map, getOrElse } from "fp-ts/Option";

// Huckmon BT13-009
// Red
// LVL3
// Rookie | Data | Mini Dragon
// DP: 2 000
// PC: 3
// DC: 0 (on red lvl2)
// Effect: [Your Turn] When you play a digimon with [Sistermon] in its name, this
//      digimon may digivolve into [BaoHuckmon] in the hand without paying the cost.
// Inheritable: [Your Turn][Once Per Turn] When you play a digimon with [Sistermon]
//      in its name, gain 1 memory.

export default registerDigimonCard({
	id: "BT13-009",
	names: ["Huckmon"],
	colors: [CardColor.RED],
	level: DigimonLevel.ROOKIE,
	dp: 2_000,
	playConditions: [{ playCost: 3 }],
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
		trash: "",
		main: `@[Your Turn]@ When you play a digimon with #[Sistermon]# in its name, this digimon may digivolve into $[BaoHuckmon]$ in the hand without paying the cost.`,
		inheritable: `@[Your Turn]@@(Once Per Turn)@ When you play a digimon with #[Sistermon]# in its name, gain 1 memory.`,
	},
	effects: {
		security: [],
		trash: [],
		main: [{
			type: EffectType.INTERRUPTIVE,
			trigger: EffectTrigger.A_DIGIMON_IS_PLAYED,
			turnCondition: EffectTurnCondition.YOUR_TURN,
			condition: ctx => {
				const card = ctx.query.lastPlayedCard();
				return card.type === CardType.DIGIMON
					&& card.owner === ctx.card.owner
					&& ctx.questions.cardNameContains(card, "Sistermon");
			},
			script: ctx => {
				ctx.actions.queueOptionalAction("Digivolve into BaoHuckmon in hand?", {
					computeState: () => ctx.query.hand()
						.filter(ctx.questions.nameIs("BaoHuckmon"))
						.filter(baoHuckmon => ctx.questions.canDigivolve(ctx.card, baoHuckmon, {ignoreCost: true}))
						.toArray(),
					canExecute: baoHuckmons => baoHuckmons.length > 0,
					action: async baoHuckmons => {
						const optBaoHuckmon = await ctx.actions.pickMaybeOne(baoHuckmons);

						await pipe(
							optBaoHuckmon,
							map(baoHuckmon => ctx.actions.digivolveInto(ctx.card, baoHuckmon, {ignoreCost: true})),
							getOrElse(Promise.resolve)
						);
					},
				});
			},
		}],
		inheritable: [{
			type: EffectType.INTERRUPTIVE,
			trigger: EffectTrigger.A_DIGIMON_IS_PLAYED,
			oncePerTurn: true,
			condition: ctx => {
				const card = ctx.query.lastPlayedCard();
				return card.type === CardType.DIGIMON
					&& card.owner === ctx.card.owner
					&& ctx.questions.cardNameContains(card, "Sistermon");
			},
			script: ctx => {
				ctx.actions.memoryPlus(1);
			},
		}],
	},
});
