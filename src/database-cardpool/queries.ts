import Sequence, { asSequence, isSequence } from "sequency";
import { GameCard } from "./utils";
import { nameContains } from "./tests";

export type CardQueryInput<LocalState = unknown> = Iterable<GameCard<LocalState>>|Sequence<GameCard<LocalState>>;

export const asQuery = <LocalState = unknown>(cards: CardQueryInput<LocalState>) => {
	return isSequence<GameCard<LocalState>>(cards) ? cards : asSequence(cards);
};

export const partitionCardsBy = <LocalState = unknown>(cards: CardQueryInput<LocalState>, predicate: (card: GameCard<LocalState>) => boolean) => {
	const partitioned = asQuery(cards).partition(predicate);

	return {
		ok: partitioned.true,
		ko: partitioned.false,
	};
};

export const partitionCardsContainingName = <LocalState = unknown>(cards: CardQueryInput<LocalState>, name: string) => {
	const expected = name.toLowerCase();
	return partitionCardsBy(cards, card => nameContains(card, expected, {
		alreadyLowerCased: true,
	}));
};
