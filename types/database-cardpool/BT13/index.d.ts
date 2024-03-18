export declare const bt13Cards: Map<string, import("../utils").CardDefinition<{
    id: string;
    type: import("../enums").CardType;
    name: string;
    colors: [import("../enums").CardColor, ...import("../enums").CardColor[]];
    level: import("../enums").DigimonLevel;
    playCost: number;
    digivolveCosts: {
        color: import("../enums").CardColor;
        level: import("../enums").DigimonLevel;
        cost: number;
    }[];
    dp: number;
    digimonForms: [import("../enums").DigimonForm, ...import("../enums").DigimonForm[]];
    digimonTypes: [import("../enums").DigimonType, ...import("../enums").DigimonType[]];
    digimonAttributes: [import("../enums").DigimonAttribute, ...import("../enums").DigimonAttribute[]];
}, {
    activatedThisTurn: boolean;
}>>;
