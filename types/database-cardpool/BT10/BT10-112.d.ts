import { CardColor, CardType, DigimonAttribute, DigimonForm, DigimonLevel, DigimonType } from "../enums";
import { z } from "zod";
export declare const bt10_112JesmonGXStateSchema: () => z.ZodObject<{
    royalKnightsInStack: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    royalKnightsInStack: number;
}, {
    royalKnightsInStack: number;
}>;
export type BT10_112_JesmonGXState = z.infer<ReturnType<typeof bt10_112JesmonGXStateSchema>>;
declare const _default: import("../utils").CardDefinition<{
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
    royalKnightsInStack: number;
}>;
export default _default;
