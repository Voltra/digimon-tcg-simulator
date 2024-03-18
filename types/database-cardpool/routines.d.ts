import { CardScriptContext, GameCard } from "./utils";
export interface GainBlitzOptions<LocalState = unknown> {
    digimon: GameCard<LocalState>;
    forTheStack: boolean;
}
export declare const gainBlitzForTheTurn: <Meta extends {
    id: string;
    type: import("./enums").CardType;
    name: string;
    colors: [import("./enums").CardColor, ...import("./enums").CardColor[]];
}, LocalState>(ctx: CardScriptContext<Meta, LocalState>, { digimon, forTheStack, }?: Partial<GainBlitzOptions>) => void;
