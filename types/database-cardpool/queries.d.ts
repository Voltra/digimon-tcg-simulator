import Sequence from "sequency";
import { GameCard } from "./utils";
export type CardQueryInput<LocalState = unknown> = Iterable<GameCard<LocalState>> | Sequence<GameCard<LocalState>>;
export declare const asQuery: <LocalState = unknown>(cards: CardQueryInput<LocalState>) => Sequence<GameCard<LocalState>>;
export declare const partitionCardsBy: <LocalState = unknown>(cards: CardQueryInput<LocalState>, predicate: (card: GameCard<LocalState>) => boolean) => {
    ok: GameCard<LocalState>[];
    ko: GameCard<LocalState>[];
};
export declare const partitionCardsContainingName: <LocalState = unknown>(cards: CardQueryInput<LocalState>, name: string) => {
    ok: GameCard<LocalState>[];
    ko: GameCard<LocalState>[];
};
