import { registerNewDigimon } from "../utils";
import { CardColor, CardTrait, CardType, DigimonAttribute, DigimonForm, DigimonLevel, DigimonType } from "../enums";
import { z } from "zod";
import { chainModifiers, inPlay } from "../scriptModifiers";
import { hasTrait, isInPlay, isSameCardAs, stackIsInPlay } from "../tests";
import { gainBlitzForTheTurn } from "../routines";
import { pipe } from "fp-ts/function";
import { map } from "fp-ts/Option";

// Jesmon GX BT10-112
// LVL7
// Mega | Data | Holy Warrior / Royal Knight / X Antibody
// DP: 15 000
// PC: 15
// DC: 5 (on red lvl6, on red lvl7)
// Digivolve: 5 from lvl6 w/ [Royal Knight] in traits
// Effect: [When Digivolving] You may place 1 card with [Royal Knight] in its trait
//      and a play cost of 13 or less from your hand or trash under this digimon
//      as its bottom digivolution card. Activate 1 of that card's [When Digivolving]
//      effects as an effect of this digimon. Then, <Blitz>.
//      [All Turns] While a card with [Royal Knight] in its traits is in this digimon's
//      digivolution cards, this card gains <Piercing> and <Blocker>, and gains
//      <Security Attack +1> for each such card.
// Inheritable: N.A.

export const bt10_112JesmonGXStateSchema = () => z.object({
	royalKnightsInStack: z.number().int().positive(),
});

export type BT10_112_JesmonGXState = z.infer<ReturnType<typeof bt10_112JesmonGXStateSchema>>;

export default registerNewDigimon<BT10_112_JesmonGXState>({
	id: "BT10-112",
	name: "Jesmon GX",
	level: DigimonLevel.OVER_MEGA,
	colors: [CardColor.RED, CardColor.BLACK],
	dp: 15_000,
	playCost: 15,
	digivolveCosts: [{
		color: CardColor.RED,
		level: DigimonLevel.MEGA,
		cost: 5,
	}, {
		color: CardColor.BLACK,
		level: DigimonLevel.MEGA,
		cost: 5,
	}],
	digimonForms: [DigimonForm.MEGA],
	digimonAttributes: [DigimonAttribute.DATA],
	digimonTypes: [DigimonType.HOLY_WARRIOR, DigimonType.ROYAL_KNIGHT, DigimonType.X_ANTIBODY],
	////
	initialLocalState: {
		royalKnightsInStack: 0,
	},
	validateLocalState(state) {
		return bt10_112JesmonGXStateSchema().parse(state);
	},
}, ctx => {
	ctx.events.onDigivolveAny((fromCard, toCard) => {
		chainModifiers(ctx, [
			inPlay,
		], () => {
			if (!isSameCardAs(toCard, ctx.card)) {
				return;
			}

			// Technically, the effect says "card", so all are allowed.
			// This includes non-digimon cards.
			const getRoyalKnights = () => ctx.query.hand()
				.plus(ctx.query.trash())
				// .filter(card => card.type === CardType.DIGIMON)
				.filter(card => hasTrait(card, CardTrait.ROYAL_KNIGHT))
				.filter(card => typeof card.playCost === "number")
				.filter(card => card.playCost <= 13)
				.toArray();

			const { stack } = ctx.card;

			ctx.actions.queueOptionalAction<ReturnType<typeof getRoyalKnights>>("Place a [Royal Knight] as bottom source of Jesmon GX?", {
				computeState: () => getRoyalKnights(),
				canExecute: royalKnights => royalKnights.length > 0 && stackIsInPlay(stack),
				action: royalKnights => {
					pipe(
						ctx.actions.pickOne(royalKnights),
						map(royalKnight => {
							stack.bottomSource(royalKnight);
							ctx.actions.forceActivateOneWhenDigivolvingEffect(royalKnight);
						}),
					)
				},
			});

			ctx.actions.queueMandatoryAction("Blitz with Jesmon GX", {
				canExecute: () => stackIsInPlay(stack),
				action: () => {
					gainBlitzForTheTurn(ctx);
				},
			});
		});
	});

	//TODO: [All Turns] effect
});
