import { GameCard } from "@/cardDefs/types/cards";
import Sequence from "sequency";

export interface CardContextQueries {
	digivolutionSources(): Sequence<GameCard>;

	hand(): Sequence<GameCard>;
	field(): Sequence<GameCard>;
	opponentField(): Sequence<GameCard>;
	board(): Sequence<GameCard>;

	lastPlayedCard(): GameCard;
}

export interface CardContextQuestions {
	isYourTurn(): boolean;
	canDigivolve(source: GameCard, into: GameCard, options?: Partial<{
		ignoreCost: boolean;
		ignoreColor: boolean;
		ignoreLevel: boolean;
	}>): boolean;

	canDeDigivolve(digimon: GameCard): boolean;
}

export interface CardContextActions {
	queueOptionalAction(message: string, options: {
		canExecute(): boolean,
		action(): Promise<void>;
	}): void;

	queueOptionalAction<State>(message: string, options: {
		computeState(): State;
		canExecute(state: State): boolean;
		action(state: State): Promise<void>;
	}): void;

	queueMandatoryAction(message: string, options: {
		canExecute(): boolean,
		action(): Promise<void>;
	}): void;

	queueMandatoryAction<State>(message: string, options: {
		computeState(): State;
		canExecute(state: State): boolean;
		action(state: State): Promise<void>;
	}): void;

	memoryPlus(n: number): void;
}

export interface CardContext {
	actions: CardContextActions;
	query: CardContextQueries;
	questions: CardContextQuestions;
}
