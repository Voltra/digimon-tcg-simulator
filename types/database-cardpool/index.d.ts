import { CardDefinition } from "./utils";
export declare const databaseCardpool: Map<string, CardDefinition<{
    id: string;
    type: import("./enums").CardType;
    name: string;
    colors: [import("./enums").CardColor, ...import("./enums").CardColor[]];
}, unknown>>;
