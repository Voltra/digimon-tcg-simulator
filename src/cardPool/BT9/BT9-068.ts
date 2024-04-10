import {
	CardColor,
	DigimonAttribute,
	DigimonForm,
	DigimonLevel,
	DigimonTrait,
	EffectTrigger,
	EffectType,
} from "@/cardDefs/enums";

// Gaiomon BT9-068
// Black / Red
// LVL6
// Mega | Virus | Dragonkin / X-Antibody
// DP: 13 000
// PC: 13
// DC: 5 (on red lvl5), 5 (on black lvl5), 2 (from [BlackWarGreymon])
// Ruling: This card/Digimon is also treated as having [Greymon] in its. name
// Effect: <Security Atk +1> <Reboot>
//      [When Digivolving] If this Digimon has a black digivolution card,
//      1 of your opponent's Digimon <De-Digivolve 1>. If this Digimon has a red
//      digivolution source, <Blitz>.

export default registerDigimonCard({
	id: "BT9-068",
	names: ["Gaiomon", "BT9_068__Gaiomon__Greymon"],
	colors: [CardColor.BLACK, CardColor.RED],
	level: DigimonLevel.MEGA,
	dp: 13_000,
	playConditions: [{ playCost: 13 }],
	digivolutionConditions: [
		{
			color: CardColor.BLACK,
			level: DigimonLevel.ULTIMATE,
			cost: 5,
		},
		{
			color: CardColor.RED,
			level: DigimonLevel.ULTIMATE,
			cost: 5,
		},
		{
			nameIs: "BlackWarGreymon",
			cost: 2,
		},
	],
	digimonForms: [DigimonForm.MEGA],
	digimonAttributes: [DigimonAttribute.VIRUS],
	traits: [DigimonTrait.DRAGONKIN, DigimonTrait.X_ANTIBODY],
	cardText: {
		security: "",
		trash: "",
		main: `
			@<Security Atk +1>@ @<Reboot>@.
			@[When Digivolving]@ If this Digimon has a black digivolution card, 1 of your opponent's Digimon @<De-Digivolve 1>@. If this Digimon has a red digivolution source, @<Blitz>@.
		`,
		inheritable: "",
	},
	effects: {
		security: [],
		trash: [],
		main: [
			{
				type: EffectType.CONTINUOUS,
				script: ctx => {
					ctx.actions.giveSecAttackPlus({
						amount: 1,
						untilEndOfTurn: Infinity,
					});

					ctx.actions.giveReboot({
						untilEndOfTurn: Infinity,
					});
				},
			},
			{
				type: EffectType.TRIGGERED,
				trigger: EffectTrigger.WHEN_DIGIVOLVING,
				script: ctx => {
					const hasBlackSource = ctx.query.digivolutionSources()
						.map(card => card.getColors())
						.flatten()
						.distinct()
						.contains(CardColor.BLACK);


					const hasRedSource = ctx.query.digivolutionSources()
						.map(card => card.getColors())
						.flatten()
						.distinct()
						.contains(CardColor.RED);

					if (hasBlackSource) {
						ctx.queueMandatoryAction("De-Digivolve 1 an opponent's Digimon", {
							computeState: ctx.query.opponentField()
								.filter(ctx.questions.isDigimon)
								.filter(ctx.questions.canDeDigivolve)
								.toArray(),
							canExecute: potentialTargets => potentialTargets.length > 0,
							action: async potentialTargets => {
								const target = await ctx.actions.pickOne(potentialTargets);
								await ctx.actions.dedigivolve(target, 1);
							},
						});
					}

					if (hasRedSource && ctx.questions.isYourTurn()) {
						ctx.actions.giveBlitz({
							once: true,
						});
					}
				},
			},
		],
		inheritable: [],
	},
});
