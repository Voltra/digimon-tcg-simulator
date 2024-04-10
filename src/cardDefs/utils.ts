import Sequence, { asSequence, isSequence } from "sequency";

import { DigimonGameCard, GameCard } from "./types";

export type CardQueryInput = Iterable<GameCard> | Sequence<GameCard>;

export const asQuery = (cards: CardQueryInput) => {
	return isSequence<GameCard>(cards) ? cards : asSequence(cards);
};

export const isSameCardAs = (card: GameCard, expected: GameCard) => card === expected;

export interface NameContainsOptions {
	alreadyLowerCased: boolean;
}

export const nameContains = (card: GameCard, name: string, {
	alreadyLowerCased = false,
}: Partial<NameContainsOptions> = {}) => {
	const expected = alreadyLowerCased ? name : name.toLowerCase();
	return asSequence(card.getNames())
		.map(name => name.toLowerCase())
		.any(name => name.includes(expected));
};

export interface NameIsOptions {
	caseInsensitive: boolean;
}

export const nameIs = (card: GameCard, name: string, {
	caseInsensitive = false,
}: Partial<NameIsOptions> = {}) => {
	if (caseInsensitive) {
		name = name.toLowerCase();
	}

	return asSequence(card.getNames())
		.map(name => name.toLowerCase())
		.contains(name);
};

export const partitionCardsBy = <LocalState = unknown>(
	cards: CardQueryInput,
	predicate: (card: GameCard) => boolean,
) => {
	const partitioned = asQuery(cards).partition(predicate);

	return {
		ok: partitioned.true,
		ko: partitioned.false,
	};
};

export const partitionCardsContainingName = <LocalState = unknown>(cards: CardQueryInput, name: string) => {
	const expected = name.toLowerCase();
	return partitionCardsBy(cards, card => nameContains(card, expected, {
		alreadyLowerCased: true,
	}));
};
