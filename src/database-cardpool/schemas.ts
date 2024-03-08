import { z } from "zod";
import { asSequence } from "sequency";
import { CardColor, CardType, DigimonAttribute, DigimonLevel, DigimonForm, DigimonType, CardLocation } from "./enums";

const hasDuplicatesBy = <T, R>(arr: T[], selector: (item: T) => R) => {
	return asSequence(arr)
		.distinctBy(selector)
		.count() !== arr.length;
};

const hasDuplicateItems = <T>(arr: T[]) => hasDuplicatesBy(arr, x => x);

export const cardLocationSchema = () => z.nativeEnum(CardLocation);

export const cardColorSchema = () => z.nativeEnum(CardColor);

export const cardTypeSchema = () => z.nativeEnum(CardType);

export const cardCostSchema = () => z.number().int().min(1).max(20);

export const newCardMetaSchema = () => z.object({
	id: z.string().regex(/^(P|BT\d{1,3}|EX\d{1,3})-\d{3}$/),
	type: cardTypeSchema(),
	name: z.string().max(255),
	colors: z.array(cardColorSchema()).nonempty()
		.refine(arr => !hasDuplicatesBy(arr, x => x), {
			message: "The colors array must not contain duplicates",
		}),
});

export type NewCardMeta = z.infer<ReturnType<typeof newCardMetaSchema>>;

export const digimonLevelSchema = () => z.nativeEnum(DigimonLevel);

export const digimonDpSchema = () => z.number().int().min(1000).multipleOf(1000);

export const digimonFormSchema = () => z.nativeEnum(DigimonForm);

export const digimonTypeSchema = () => z.nativeEnum(DigimonType);

export const digimonAttributeSchema = () => z.nativeEnum(DigimonAttribute);

export const newDigimonMetaSchema = () => newCardMetaSchema().merge(
	z.object({
		level: digimonLevelSchema(),
		playCost: cardCostSchema().min(1),
		digivolveCosts: z.array(z.object({
			color: cardColorSchema(),
			level: digimonLevelSchema(),
			cost: cardCostSchema(),
		})).refine(arr => !hasDuplicatesBy(arr, item => `${item.color}--${item.level}`), {
			message: "The digivolveCosts array must not contain duplicates of (color, level) pairs",
		}),
		dp: digimonDpSchema(),
		digimonForms: z.array(digimonFormSchema())
			.nonempty()
			.refine(arr => !hasDuplicateItems(arr), {
				message: "The digimonForms array must not contain duplicates",
			}),
		digimonTypes: z.array(digimonTypeSchema())
			.nonempty()
			.refine(arr => !hasDuplicateItems(arr), {
				message: "The digimonTypes array must not contain duplicates",
			}),
		digimonAttributes: z.array(digimonAttributeSchema())
			.nonempty()
			.refine(arr => !hasDuplicateItems(arr), {
				message: "The attributes array must not contain duplicates",
			}),
	}),
);

export type NewDigimonMeta = z.infer<ReturnType<typeof newDigimonMetaSchema>>;
