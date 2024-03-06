import { CardColor, DigimonLevel, DigimonStage, registerNewDigimon } from "../utils";
import { DigimonAttribute, DigimonType } from "../schemas";

// Diaboromon P-016
// LVL6
// Mega | Unknown | Unidentified
// DP: 11 000
// PC: 11
// DC: 3 (on black lvl5)
// [Your Turn] For each "Diaboromon" you have in play, this Digimon gets <Sec+1>

export default registerNewDigimon({
	id: "P-016",
	name: "Diaboromon",
	level: DigimonLevel.MEGA,
	colors: [CardColor.BLACK],
	dp: 11_000,
	playCost: 11,
	digivolveCosts: [{
		level: DigimonLevel.ULTIMATE,
		color: CardColor.BLACK,
		cost: 3,
	}],
	digimonStage: DigimonStage.MEGA,
	digimonAttributes: [DigimonAttribute.UNKNOWN],
	digimonTypes: [DigimonType.UNIDENTIFIED],
}, ctx => {
	const isAnotherDiaboromonOfOurs = (card: any) => card.getName() === ctx.meta.name && card.owner === ctx.card.owner;

	ctx.onPlayAny((card: any) => {
		if (!isAnotherDiaboromonOfOurs(card)) {
			return;
		}

		ctx.secAtkPlus();
	});

	const whenLeaving = (card: any) => {
		if (!isAnotherDiaboromonOfOurs(card)) {
			return;
		}

		ctx.secAtkMinus();
	};

	ctx.onDestroyAny(whenLeaving);
	ctx.onBounceAnyToHand(whenLeaving);
	ctx.onBounceAnyToDeck(whenLeaving);

	ctx.onDigivolveAny((fromCard: any, toCard: any) => {
		if (fromCard.inRaising) {
			return;
		}

		if (isAnotherDiaboromonOfOurs(fromCard)) {
			ctx.secAtkMinus();
		}

		if (isAnotherDiaboromonOfOurs(toCard)) {
			ctx.secAtkPlus();
		}
	});

	ctx.onDeDigivolveAny((fromCard: any, toCard: any) => {
		if (fromCard.inRaising) {
			return;
		}

		if (isAnotherDiaboromonOfOurs(fromCard)) {
			ctx.secAtkMinus();
		}

		if (isAnotherDiaboromonOfOurs(toCard)) {
			ctx.secAtkPlus();
		}
	});
});
