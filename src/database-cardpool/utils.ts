import { NewCardMeta, newCardMetaSchema, NewDigimonMeta, newDigimonMetaSchema } from "./schemas";
import { CardLocation, CardType } from "./enums";
import { z } from "zod";
import Sequence from "sequency";
import { Option } from "fp-ts/Option";

export interface Player {
	[k: string]: any;
}

export interface DigimonStack {
	[k: string]: any;
}

export type GameCardOverrides = Partial<{
	[K in keyof NewCardMeta]: K extends "id" ? never : Array<NewCardMeta[K]>
}>;

export interface DigivolutionOptions {
	/**
	 * Whether we should ignore the digivolution cost
	 * @default false
	 */
	ignoreCost: boolean;

	/**
	 * Whether we should ignore color requirements
	 */
	ignoreColor: boolean;
}

export interface GameCard<LocalState = undefined> extends NewCardMeta {
	/**
	 * This card instance's local state.
	 * @warning This is strictly used for use in the card's script. Nothing else should ever touch it.
	 */
	localState: LocalState;

	/**
	 * The player to whom this card belong
	 */
	owner: Player;

	/**
	 * The stack this card is a part of
	 * NB: Mostly for digimons, but tamers are also part of it in Hybrid, maybe options too one day?
	 */
	stack: DigimonStack;

	/**
	 * This is were overrides happen (e.g. a card changes the name, useful for tokens, etc...)
	 */
	overrides: GameCardOverrides;

	/**
	 * The current location of this card
	 */
	location: CardLocation;

	/**
	 * Whether this card is currently in the raising area
	 */
	inRaising(): boolean;

	/**
	 * Get the resolved name of this card.
	 * This takes into account overrides.
	 */
	getName(): string;

	[k: string]: any;
}

export interface CardScriptContextQuery {
	/**
	 * Create a new query builder for the cards currently in hand
	 */
	hand(): Sequence<GameCard<any>>;

	/**
	 * Create a new query builder for the cards currently on the (player's) field
	 */
	field(): Sequence<GameCard<any>>;

	/**
	 * Create a new query builder for the cards currently on the board
	 */
	boardQuery(): Sequence<GameCard<any>>;

	/**
	 * Determine whether we can digivolve this card into the given card
	 * @param into The card we want to digivolve into
	 * @param [options] - The digivolution options to use
	 */
	canDigivolveInto(into: GameCard<unknown>, options?: Partial<DigivolutionOptions>): boolean;
}

export interface CardScriptContextPlayerEvents {
	/**
	 * Listen for when your turn starts
	 */
	onTurnStart(listener: () => void): void;

	/**
	 * Listen for when your turn ends
	 */
	onTurnEnd(listener: () => void): void;

	/**
	 * Listen for when you play a card (hard-played or by effect)
	 */
	onPlay(listener: (card: GameCard<unknown>) => void): void;
}

export interface CardScriptContextCardEvents {
	/**
	 * Listen for when this card attacks
	 */
	onAttacking(listener: (/* TODO: Add relevant arguments */) => void): void;
}

export interface CardScriptContextGlobalEvents {
	/**
	 * Listen for when a turn starts
	 */
	onAnyTurnStart(listener: (newTurnPlayer: Player) => void): void;

	/**
	 * Listen for when any card is played (hard-played or by effect)
	 */
	onPlayAny(listener: (card: GameCard<unknown>) => void): void;

	/**
	 * Listen for when any card digivolves
	 */
	onDigivolveAny(listener: (fromCard: GameCard<unknown>, toCard: GameCard<unknown>) => void): void;

	/**
	 * Listen for when any card de-digivolves
	 */
	onDeDigivolveAny(listener: (fromCard: GameCard<unknown>, toCard: GameCard<unknown>) => void): void;

	/**
	 * Listen for when any card is promoted from the raising area
	 */
	onPromoteAny(listener: (card: GameCard<unknown>) => void): void;

	/**
	 * Listen for when a card is destroyed by effect
	 */
	onDestroyAny(listener: (card: GameCard<unknown>) => void): void;

	/**
	 * Listen for when a card dies (in battle, or by DP reduction)
	 */
	onAnyDie(listener: (card: GameCard<unknown>) => void): void;

	/**
	 * Listen for when any card bounces back to hand
	 */
	onBounceAnyToHand(listener: (card: GameCard<unknown>) => void): void;

	/**
	 * Listen for when any card bounces back to deck
	 */
	onBounceAnyToDeck(listener: (card: GameCard<unknown>) => void): void;

	/**
	 * Listen for when any card bounces back to the top of the deck
	 */
	onBounceAnyToTopDeck(listener: (card: GameCard<unknown>) => void): void;

	/**
	 * Listen for when any card bounces back to the bottom of the deck
	 */
	onBounceAnyToBottomDeck(listener: (card: GameCard<unknown>) => void): void;
}

export type QueuedActionOptions<ActionState = undefined> = ActionState extends undefined ? {
	/**
	 * The predicate used to check whether the action can still be performed
	 */
	canExecute: () => boolean;

	/**
	 * The callback to execute the action
	 */
	action: () => void;
} : {
	/**
	 * The function used to compute the action's current state
	 */
	computeState: ActionState extends undefined ? never : () => ActionState;

	/**
	 * The predicate used to check whether the action can still be performed
	 */
	canExecute: (state: ActionState) => boolean;

	/**
	 * The callback to execute the action
	 */
	action: (state: ActionState) => void;
};

export interface CardScriptContextActions {
	/**
	 * Add a mandatory action to the effect resolution pile
	 * @param message - The message to display to the user to identify the action
	 * @param options
	 */
	queueMandatoryAction<ActionState = undefined>(message: string, options: QueuedActionOptions<ActionState>): void;

	/**
	 * Add an optional action to the effect resolution pile
	 * @param confirmationMessage - The message to display to the user to identify the action (and in the confirmation dialog)
	 * @param options
	 */
	queueOptionalAction<ActionState = undefined>(confirmationMessage: string, options: QueuedActionOptions<ActionState>): void;

	/**
	 * Ask the player for confirmationo on an action
	 */
	askForConfirmation(message: string): boolean;

	/**
	 * Gain memory
	 * @param amount
	 */
	gainMemory(amount: number): boolean;

	/**
	 * Reveal the {@link n} top cards of the deck
	 * @param n - The amount of cards to reveal
	 * @note Side-effect is that it shows a confirmation modal for both players
	 * with all cards revealed. They're also logged.
	 */
	revealTopDeck(n: number): GameCard<any>[];

	/**
	 * Add the given card(s) to the player's hands
	 */
	addToHand(cards: GameCard<unknown>[]): void;
	addToHand(card: GameCard<unknown>): void;

	/**
	 * Send the given cards to the bottom of the deck, letting the player
	 * pick the order in which they'll be put. This will prompt the user
	 * with an order picking modal for the given cards.
	 */
	bottomDeckPickOrder(cards: GameCard<unknown>[]): void;

	/**
	 * Ask the user to pick a single card between those provided
	 * @param cards - The cards to pick from
	 * @returns none if the user wants to cancel, or some card from {@link cards}
	 */
	pickOne(cards: GameCard<unknown>[]): Option<GameCard<any>>;

	/**
	 * Digivolve this card into the given card
	 * @param into - The card to digivolve into
	 * @param [options] - The digivolution options to use
	 */
	digivolveInto(into: GameCard<unknown>, options?: Partial<DigivolutionOptions>): void;
}

export interface CardScriptContext<Meta extends NewCardMeta, LocalState = undefined> {
	// Properties
	meta: Meta;
	card: GameCard<LocalState>;

	// Controls
	/**
	 * Make queries regarding the current game state
	 */
	query: CardScriptContextQuery;

	/**
	 * Register event listeners for player-bound events
	 */
	thisPlayerEvents: CardScriptContextPlayerEvents;

	/**
	 * Register event listeners for card-bound events (bound to this card that is)
	 */
	thisCardEvents: CardScriptContextCardEvents;

	/**
	 * Register event listeners for unbound events
	 */
	events: CardScriptContextGlobalEvents;

	/**
	 * Execute actions from this card's context
	 */
	actions: CardScriptContextActions;

	[k: string]: any;
}

export type CardScript<Meta extends NewCardMeta, LocalState = undefined> = (context: CardScriptContext<Meta, LocalState>) => void;

export interface LocalStateMeta<LocalState = undefined> {
	initialLocalState: LocalState;
	validateLocalState: LocalState extends undefined ? undefined : (state: LocalState, zod: typeof z) => LocalState,
}

export interface CardDefinition<Meta extends NewCardMeta, LocalState = undefined> extends NewCardMeta, LocalStateMeta<LocalState> {
	script: CardScript<Meta, LocalState>;
}

export const registerNewCard = <LocalState = undefined>(meta: NewCardMeta & LocalStateMeta<LocalState>, script: CardScript<NewCardMeta, LocalState>): CardDefinition<typeof meta, LocalState> => {
	const validMeta = newCardMetaSchema()
		.passthrough()
		.parse(meta);

	// @ts-ignore We know from the type system and validation passthrough that we have the right type
	return {
		...validMeta,
		script,
	};
};

export const registerNewDigimon = <LocalState = undefined>(meta: Omit<NewDigimonMeta, "type"> & LocalStateMeta<LocalState>, script: CardScript<NewDigimonMeta, LocalState>): CardDefinition<NewDigimonMeta, LocalState> => {
	const validMeta = newDigimonMetaSchema()
		.passthrough()
		.parse({
			...meta,
			type: CardType.DIGIMON,
		}) satisfies NewDigimonMeta;

	const validLocalState = meta.validateLocalState?.(meta.initialLocalState, z);

	// @ts-ignore We know from the type system and validation passthrough that we have the right type
	return registerNewCard<LocalState>({
		...validMeta,
		// @ts-ignore (We know it does the right thing)
		initialLocalState: validLocalState,
	}, script);
};

