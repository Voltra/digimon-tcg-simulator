import { CardColor, DigimonAttribute, DigimonLevel, DigimonForm, DigimonType } from "../enums";
import { z } from "zod";
export declare const p016DiaboromonStateSchema: () => z.ZodObject<{
    diaboroCount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    diaboroCount: number;
}, {
    diaboroCount: number;
}>;
export type P016_DiaboromonState = z.infer<ReturnType<typeof p016DiaboromonStateSchema>>;
declare const _default: import("../utils").CardDefinition<{
    id: string;
    type: import("../enums").CardType;
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
    diaboroCount: number;
}>;
export default _default;
