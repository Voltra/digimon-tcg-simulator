import { NewCardMeta } from "./schemas";
import { isInPlay, isTopOfStack } from "./tests";
import { BooleanKeys, NonEmptyArr } from "../types";
import { CardScriptContext } from "./utils";

/**
 * A script modifier is a function that customizes the inherent behavior of an effect.
 * Modifiers are meant to be used inside event listeners, not the other way around.
 * @example
 *  ctx.onPlayAny(card => {
 *      oncePerTurn(ctx, "myLocalStateOPTGuardKey", () => {
 *          // my OPT effect code here
 *      });
 *  }); //-> OK
 *
 *  //// Whereas
 *
 *  oncePerTurn(ctx, "myLocalStateOPTGuardKey", () => {
 *      ctx.onPlayAny(card => {
 *          // my OPT effect code here
 *      });
 *  }); //-> KO
 */
export type ScriptModifier<Meta extends NewCardMeta, LocalState = undefined> = (
	ctx: CardScriptContext<Meta, LocalState>,
	effectCallback: () => void,
) => void;
/**
 * Chain 2 or more modifiers together (avoids nested-hell)
 * @param ctx - The card context
 * @param modifiers - The modifiers to apply (in sequence, LTR)
 * @param effectCallback - The effect's code
 * @example
 *      ctx.onAttack(() => {
 *          chainModifiers(ctx, [
 *              inheritableEffect,
 *              oncePerTurn.via("myLocalStateOPTGuardKey"),
 *          ], () => {
 *              // my inheritable OPT effect code here
 *          });
 *      });
 */
export const chainModifiers = <Meta extends NewCardMeta, LocalState = undefined, Modifiers extends NonEmptyArr<ScriptModifier<Meta, LocalState>> = NonEmptyArr<ScriptModifier<Meta, LocalState>>>(
	ctx: CardScriptContext<Meta, LocalState>,
	modifiers: Modifiers,
	effectCallback: () => void,
) => {
	// Since copying, reversing, and popping is cheap, we'll use all that
	const localModifiers = [...modifiers].reverse();

	/**
	 * Recursive routine to call each modifier in sequence
	 * @param modifier - The current modifier being called
	 */
	const callModifier = (modifier: Modifiers[number]) => {
		if (localModifiers.length) {
			// If we still have modifiers to apply we call this one
			// and its callback will just be used to keep iterating
			// until we reach the last modifier.
			modifier(ctx, () => {
				// The check above guarantees we have at least one left
				callModifier(localModifiers.pop()!);
			});
		} else {
			// We've reached the very last modifier.
			// That means we can finally pass the effect callback as argument.
			modifier(ctx, effectCallback);
		}
	};

	// Start the recursive madness with our first (guaranteed) element
	callModifier(localModifiers.pop()!);
};

/**
 * Bind an extended modifier's arguments
 * @param modifier - The extended modifier to bind arguments for
 * @param args - The arguments to bind
 * @returns The bound "regular" modifier
 */
export const bindModifier = <Meta extends NewCardMeta, LocalState, Args extends [any, ...any[]]>(modifier: (
	ctx: CardScriptContext<Meta, LocalState>,
	...args: [...Args, effectCallback: () => void]
) => void, args: Args): ScriptModifier<Meta, LocalState> => {
	return (ctx, effectCallback) => {
		return modifier(ctx, ...args, effectCallback);
	};
};

/**
 * Modifier that applies the effect only if the current card is in play
 * @param ctx - The card context
 * @param effectCallback - The effect's code
 */
export const inPlay = <Meta extends NewCardMeta, LocalState>(
	ctx: CardScriptContext<Meta, LocalState>,
	effectCallback: () => void,
) => {
	if (isInPlay(ctx.card)) {
		effectCallback();
	}
};
/**
 * Modifier that applies the effect only if the current card is at the top of its stack
 * @param ctx - The card context
 * @param effectCallback - The effect's code
 */
export const whenTopOfStack = <Meta extends NewCardMeta, LocalState>(
	ctx: CardScriptContext<Meta, LocalState>,
	effectCallback: () => void,
) => {
	if (isTopOfStack(ctx.card)) {
		effectCallback();
	}
};

/**
 * Extended modifier that applies the effect once per turn, based on a given guard
 * @param ctx - The card context
 * @param optProp - The local state property used to keep track of activations
 * @param effectCallback - The effect's code
 */
export const oncePerTurn = <Meta extends NewCardMeta, LocalState extends object, Key extends BooleanKeys<LocalState>>(
	ctx: CardScriptContext<Meta, LocalState>,
	optProp: Key,
	effectCallback: () => void,
) => {
	if (ctx.card.localState[optProp]) {
		return;
	}

	// @ts-ignore Ensured OK by the use of BooleanKeys<LocalState>
	ctx.card.localState[optProp] = true;

	effectCallback();
};

/**
 * Curry the {@link oncePerTurn} modifier for the given key
 * @param key - The local state property used to keep track of activations
 */
oncePerTurn.via = <Meta extends NewCardMeta, LocalState extends object, Key extends BooleanKeys<LocalState>>(key: Key): ScriptModifier<Meta, LocalState> => {
	return (ctx, effectCallback) => oncePerTurn(ctx, key, effectCallback);
};

export const mainEffect = whenTopOfStack;

/**
 * Modifier that applies the effect only if the current card is not the top card of a stack
 * @param ctx - The card context
 * @param effectCallback - The effect's code
 */
export const inheritableEffect = <Meta extends NewCardMeta, LocalState = undefined>(
	ctx: CardScriptContext<Meta, LocalState>,
	effectCallback: () => void,
) => {
	if (!isTopOfStack(ctx.card)) {
		effectCallback();
	}
};
