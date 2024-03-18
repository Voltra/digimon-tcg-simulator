import { NewCardMeta, newCardMetaSchema, NewDigimonMeta, newDigimonMetaSchema } from "./schemas";
import { CardLocation, CardTrait, CardType } from "./enums";
import { z } from "zod";
import Sequence from "sequency";
import { Option } from "fp-ts/Option";

export interface Player {
	[k: string]: any;
}

export interface DigimonStack {
	/**
	 * Query the cards in the stack (from bottom to top)
	 */
	query(): Sequence<GameCard<any>>;

	/**
	 * Check whether the stack is currently in the play area
	 */
	isInPlay(): boolean;

	/**
	 * Get the top card of this stack
	 */
	topCard(): GameCard<any>;

	/**
	 * Give the stack <Security Atk +{@link n}>
	 * @param [n = 1] - The amount of security attack to give (must be > 0)
	 */
	secAtkPlus(n?: number): void;

	/**
	 * Give the stack <Security Atk -{@link n}>
	 * @param [n = 1] - The amount of security attack to remove (must be > 0)
	 */
	secAtkMinus(n?: number): void;

	/**
	 * Give the stack <+{@link dp} DP>
	 * @param dp - The amount of DP to gain (must be > 0 and a multiple of 1000)
	 */
	gainDP(dp: number): void;

	/**
	 * Give the stack <-{@link dp} DP>
	 * @param dp - The amount of DP to gain (must be > 0 and a multiple of 1000)
	 */
	loseDP(dp: number): void;

	/**
	 * Add the given card as the bottom source of this stack
	 * @param card - The card to put at the bottom of the stack
	 */
	bottomSource(card: GameCard<unknown>): void;

	/**
	 * Add the given card as the top source (i.e. the card below the top card) of this stack
	 * @param card - The card to put at the top of the stack
	 */
	topSource(card: GameCard<unknown>): void;

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

export interface HardPlayOptions {
	/**
	 * Whether we should ignore the play cost
	 * @default false
	 */
	ignoreCost: boolean;

	/**
	 * Whether we should ignore color requirements
	 */
	ignoreColor: boolean;
}

export interface PlayByEffectOptions extends HardPlayOptions {
	/**
	 * The card whose effect played the given card
	 */
	playedBy: GameCard<unknown>;
}

export type AttackTarget<LocalState = undefined> = "security"|GameCard<LocalState>;

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

	/**
	 * Get the resolved traits of this card.
	 * This takes into account overrides and
	 * different card types (e.g. Digimon, Option).
	 */
	getTraits(): CardTrait[];

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
	 * Create a new query builder for the cards currently in trash
	 */
	trash(): Sequence<GameCard<any>>;

	/**
	 * Create a new query builder for the cards currently in the enemy's trash
	 */
	enemyTrash(): Sequence<GameCard<any>>;

	/**
	 * Create a new query builder for the cards currently in any player's trash
	 */
	allTrash(): Sequence<GameCard<any>>;

	/**
	 * Determine whether we can digivolve this card into the given card
	 * @param into The card we want to digivolve into
	 * @param [options] - The digivolution options to use
	 */
	canDigivolveInto(into: GameCard<unknown>, options?: Partial<DigivolutionOptions>): boolean;

	/**
	 * Get the current amount of memory for this player
	 * @returns a positive number or zero if it's still the player's turn,
	 * a negative number if it's the opponent's turn or if it would be the opponent's turn
	 * after the last action is processed.
	 */
	memory(): number;
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
	 * @note belongsTo(card, ctx.card.owner) will always be true at the top level of {@link listener}
	 * @note isInPlay(card) will always be true at the top level of {@link listener}
	 */
	onPlay(listener: (card: GameCard<unknown>) => void): void;

	/**
	 * Listen for when memory changes during this turn (listener is removed at the end of the turn)
	 */
	onMemoryChangeThisTurn(listener: (fromMemory: number, toMemory: number) => void): void;
}

export interface CardScriptContextCardEvents {
	/**
	 * Listen for when this card attacks
	 */
	onAttacking(listener: (attackTarget: AttackTarget<unknown>) => void): void;

	/**
	 * Listen for when this card attacks security
	 */
	onAttackingSecurity(listener: () => void): void;

	/**
	 * Listen for when this card attacks another digimon
	 */
	onAttackingDigimon(listener: (attackTarget: GameCard<unknown>) => void): void;
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

	/**
	 * Hard play the given card
	 * @param card - The card to play
	 * @param options - The play options to use
	 */
	hardPlayEffect(card: GameCard<unknown>, options?: Partial<HardPlayOptions>): void;

	/**
	 * Play the given card by an effect
	 * @param card - The card to play
	 * @param options - The play options to use
	 */
	playByEffect(card: GameCard<unknown>, options: Partial<PlayByEffectOptions> & Required<Pick<PlayByEffectOptions, "playedBy">>): void;

	/**
	 * Ask the user to pick an attack target using the given digimon
	 * @param attacker - The card to attack with
	 * @param [canAttackOnOpponentsTurn = false] - Whether we can attack on the opponent's turn (or if turn would pass)
	 */
	pickAttackTarget(attacker: GameCard<unknown>, canAttackOnOpponentsTurn?: boolean): Option<AttackTarget<any>>;

	/**
	 * Perform an attack on security
	 */
	attackSecurity(attacker: GameCard<unknown>): void;

	/**
	 * Perform an attack by the given digimon on the other given digimon
	 */
	attackDigimon(attackOptions: {
		/**
		 * The digimon that attacks
		 */
		by: GameCard<unknown>,

		/**
		 * The digimon being attacked
		 */
		on: GameCard<unknown>,

		/**
		 * Whether we can attack on the opponent's turn (or if turn would pass)
		 * @default false
		 */
		canAttackOnOpponentsTurn?: boolean,
	}): void;

	/**
	 * Declare an attack by the given digimon
	 * @param attacker - The digimon that attacks
	 * @param [canAttackOnOpponentsTurn = false] - Whether we can attack on the opponent's turn (or if turn would pass)
	 * @example It's the same as doing
	 *  pipe(
	 *      actions.pickAttackTarget(myDigimon, onOpTurn),
	 *      map(attackTarget => {
	 *          if (attackTarget === "security") {
	 *              actions.attackSecurity(myDigimon);
	 *          } else {
	 *              actions.attackDigimon({
	 *                  by: myDigimon,
	 *                  on: attackTarget,
	 *                  canAttackOnOpponentsTurn: onOpTurn,
	 *              });
	 *          }
	 *      }),
	 *  );
	 */
	declareAttack(attacker: GameCard<unknown>, canAttackOnOpponentsTurn?: boolean): void;

	/**
	 * Forcefully activate one of the [When Digivolving] effect of the given digimon (prompts the user for which one to pick)
	 * @param digimon
	 */
	forceActivateOneWhenDigivolvingEffect(digimon: GameCard<unknown>): void;
}

export interface CardScriptContext<Meta extends NewCardMeta, LocalState> {
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

export type CardScript<Meta extends NewCardMeta, LocalState> = (context: CardScriptContext<Meta, LocalState>) => void;

export type LocalStateMeta<LocalState> = LocalState extends undefined ? {} : {
	initialLocalState: LocalState;
	validateLocalState: (state: LocalState, zod: typeof z) => LocalState,
}

// @ts-ignore We know it's safe to extend from LocalStateMeta<LocalState>
export interface CardDefinition<Meta extends NewCardMeta, LocalState> extends NewCardMeta, LocalStateMeta<LocalState> {
	script: CardScript<Meta, LocalState>;
}

export const registerNewCard = <LocalState = undefined>(meta: NewCardMeta & LocalStateMeta<LocalState>, script: CardScript<NewCardMeta, LocalState>): CardDefinition<typeof meta, LocalState> => {
	const validMeta = newCardMetaSchema()
		.passthrough()
		.parse(meta) satisfies NewCardMeta;

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

	if ("validateLocalState" in meta && "initialLocalState" in meta) {
		const validLocalState = meta.validateLocalState(meta.initialLocalState, z);

		// @ts-ignore We know from the type system and validation passthrough that we have the right type
		return registerNewCard<LocalState>({
			...validMeta,
			// @ts-ignore (We know it does the right thing)
			initialLocalState: validLocalState,
		}, script);
	}

	// @ts-ignore We know from the type system and validation passthrough that we have the right type
	return registerNewCard<LocalState>(validMeta, script);
};

