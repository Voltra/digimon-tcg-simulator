import { z } from "zod";
import { CardColor, CardType, DigimonAttribute, DigimonLevel, DigimonForm, DigimonType, CardLocation } from "./enums";
export declare const cardLocationSchema: () => z.ZodNativeEnum<typeof CardLocation>;
export declare const cardColorSchema: () => z.ZodNativeEnum<typeof CardColor>;
export declare const cardTypeSchema: () => z.ZodNativeEnum<typeof CardType>;
export declare const cardCostSchema: () => z.ZodNumber;
export declare const newCardMetaSchema: () => z.ZodObject<{
    id: z.ZodString;
    type: z.ZodNativeEnum<typeof CardType>;
    name: z.ZodString;
    colors: z.ZodEffects<z.ZodArray<z.ZodNativeEnum<typeof CardColor>, "atleastone">, [CardColor, ...CardColor[]], [CardColor, ...CardColor[]]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: CardType;
    name: string;
    colors: [CardColor, ...CardColor[]];
}, {
    id: string;
    type: CardType;
    name: string;
    colors: [CardColor, ...CardColor[]];
}>;
export type NewCardMeta = z.infer<ReturnType<typeof newCardMetaSchema>>;
export declare const digimonLevelSchema: () => z.ZodNativeEnum<typeof DigimonLevel>;
export declare const digimonDpSchema: () => z.ZodNumber;
export declare const digimonFormSchema: () => z.ZodNativeEnum<typeof DigimonForm>;
export declare const digimonTypeSchema: () => z.ZodNativeEnum<typeof DigimonType>;
export declare const digimonAttributeSchema: () => z.ZodNativeEnum<typeof DigimonAttribute>;
export declare const newDigimonMetaSchema: () => z.ZodObject<{
    id: z.ZodString;
    type: z.ZodNativeEnum<typeof CardType>;
    name: z.ZodString;
    colors: z.ZodEffects<z.ZodArray<z.ZodNativeEnum<typeof CardColor>, "atleastone">, [CardColor, ...CardColor[]], [CardColor, ...CardColor[]]>;
    level: z.ZodNativeEnum<typeof DigimonLevel>;
    playCost: z.ZodNumber;
    digivolveCosts: z.ZodEffects<z.ZodArray<z.ZodObject<{
        color: z.ZodNativeEnum<typeof CardColor>;
        level: z.ZodNativeEnum<typeof DigimonLevel>;
        cost: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        color: CardColor;
        level: DigimonLevel;
        cost: number;
    }, {
        color: CardColor;
        level: DigimonLevel;
        cost: number;
    }>, "many">, {
        color: CardColor;
        level: DigimonLevel;
        cost: number;
    }[], {
        color: CardColor;
        level: DigimonLevel;
        cost: number;
    }[]>;
    dp: z.ZodNumber;
    digimonForms: z.ZodEffects<z.ZodArray<z.ZodNativeEnum<typeof DigimonForm>, "atleastone">, [DigimonForm, ...DigimonForm[]], [DigimonForm, ...DigimonForm[]]>;
    digimonTypes: z.ZodEffects<z.ZodArray<z.ZodNativeEnum<typeof DigimonType>, "atleastone">, [DigimonType, ...DigimonType[]], [DigimonType, ...DigimonType[]]>;
    digimonAttributes: z.ZodEffects<z.ZodArray<z.ZodNativeEnum<typeof DigimonAttribute>, "atleastone">, [DigimonAttribute, ...DigimonAttribute[]], [DigimonAttribute, ...DigimonAttribute[]]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: CardType;
    name: string;
    colors: [CardColor, ...CardColor[]];
    level: DigimonLevel;
    playCost: number;
    digivolveCosts: {
        color: CardColor;
        level: DigimonLevel;
        cost: number;
    }[];
    dp: number;
    digimonForms: [DigimonForm, ...DigimonForm[]];
    digimonTypes: [DigimonType, ...DigimonType[]];
    digimonAttributes: [DigimonAttribute, ...DigimonAttribute[]];
}, {
    id: string;
    type: CardType;
    name: string;
    colors: [CardColor, ...CardColor[]];
    level: DigimonLevel;
    playCost: number;
    digivolveCosts: {
        color: CardColor;
        level: DigimonLevel;
        cost: number;
    }[];
    dp: number;
    digimonForms: [DigimonForm, ...DigimonForm[]];
    digimonTypes: [DigimonType, ...DigimonType[]];
    digimonAttributes: [DigimonAttribute, ...DigimonAttribute[]];
}>;
export type NewDigimonMeta = z.infer<ReturnType<typeof newDigimonMetaSchema>>;
