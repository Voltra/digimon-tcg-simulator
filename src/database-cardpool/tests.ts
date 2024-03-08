import { GameCard, Player } from "./utils";
import { CardLocation } from "./enums";

export const isSameCardAs = (card: GameCard<any>, expected: GameCard<any>) => card === expected;

export interface NameContainsOptions {
	alreadyLowerCased: boolean;
}

export const nameContains = <LocalState = any>(card: GameCard<LocalState>, name: string, {
	alreadyLowerCased = false,
}: Partial<NameContainsOptions> = {}) => {
	const expected = alreadyLowerCased ? name : name.toLowerCase();
	return card.getName().toLowerCase().includes(expected);
};

export interface NameIsOptions {
	caseInsensitive: boolean;
}

export const nameIs = <LocalState = any>(card: GameCard<LocalState>, name: string, {
	caseInsensitive = false,
}: Partial<NameIsOptions> = {}) => {
	if (caseInsensitive) {
		name = name.toLowerCase();
	}

	const cardName = caseInsensitive ? card.getName().toLowerCase() : card.getName();

	return cardName === name;
};

export const belongsToPlayer = <LocalState>(card: GameCard<LocalState>, player: Player) => card.owner === player;

export const isInPlay = <LocalState>(card: GameCard<LocalState>) => card.location === CardLocation.PLAY_AREA;

export const isTopOfStack = <LocalState>(card: GameCard<LocalState>) => isSameCardAs(card.stack.topCard(), card);

export const isInRaising = <LocalState>(card: GameCard<LocalState>) => card.location === CardLocation.RAISING;
