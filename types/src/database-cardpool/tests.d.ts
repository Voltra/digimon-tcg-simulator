import { DigimonStack, GameCard, Player } from "./utils";
import { CardTrait } from "./enums";
export declare const isSameCardAs: (card: GameCard<any>, expected: GameCard<any>) => boolean;
export interface NameContainsOptions {
    alreadyLowerCased: boolean;
}
export declare const nameContains: <LocalState = any>(card: GameCard<LocalState>, name: string, { alreadyLowerCased, }?: Partial<NameContainsOptions>) => boolean;
export interface NameIsOptions {
    caseInsensitive: boolean;
}
export declare const nameIs: <LocalState = any>(card: GameCard<LocalState>, name: string, { caseInsensitive, }?: Partial<NameIsOptions>) => boolean;
export declare const belongsToPlayer: <LocalState>(card: GameCard<LocalState>, player: Player) => boolean;
export declare const isInPlay: <LocalState>(card: GameCard<LocalState>) => boolean;
export declare const stackIsInPlay: (stack: DigimonStack) => boolean;
export declare const isTopOfStack: <LocalState>(card: GameCard<LocalState>) => boolean;
export declare const isInRaising: <LocalState>(card: GameCard<LocalState>) => boolean;
export declare const hasTrait: <LocalState>(card: GameCard<LocalState>, trait: CardTrait) => boolean;
