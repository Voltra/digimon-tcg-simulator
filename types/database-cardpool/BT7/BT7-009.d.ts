import { z } from "zod";
import { CardColor, DigimonAttribute, DigimonForm, DigimonLevel, DigimonType } from "../enums";
export declare const bt7_009HuckmonStateSchema: () => z.ZodObject<{
    activatedThisTurn: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    activatedThisTurn: boolean;
}, {
    activatedThisTurn: boolean;
}>;
export type BT7_009_HuckmonState = z.infer<ReturnType<typeof bt7_009HuckmonStateSchema>>;
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
    activatedThisTurn: boolean;
}>;
export default _default;
