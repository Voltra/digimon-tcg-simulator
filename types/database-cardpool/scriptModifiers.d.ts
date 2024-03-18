import { NewCardMeta } from "./schemas";
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
export type ScriptModifier<Meta extends NewCardMeta, LocalState = undefined> = (ctx: CardScriptContext<Meta, LocalState>, effectCallback: () => void) => void;
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
export declare const chainModifiers: <Meta extends {
    id: string;
    type: import("./enums").CardType;
    name: string;
    colors: [import("./enums").CardColor, ...import("./enums").CardColor[]];
}, LocalState = undefined, Modifiers extends NonEmptyArr<ScriptModifier<Meta, LocalState>> = NonEmptyArr<ScriptModifier<Meta, LocalState>>>(ctx: CardScriptContext<Meta, LocalState>, modifiers: Modifiers, effectCallback: () => void) => void;
/**
 * Bind an extended modifier's arguments
 * @param modifier - The extended modifier to bind arguments for
 * @param args - The arguments to bind
 * @returns The bound "regular" modifier
 */
export declare const bindModifier: <Meta extends {
    id: string;
    type: import("./enums").CardType;
    name: string;
    colors: [import("./enums").CardColor, ...import("./enums").CardColor[]];
}, LocalState, Args extends [any, ...any[]]>(modifier: (ctx: CardScriptContext<Meta, LocalState>, ...args: [...Args, effectCallback: () => void]) => void, args: Args) => ScriptModifier<Meta, LocalState>;
/**
 * Modifier that applies the effect only if the current card is in play
 * @param ctx - The card context
 * @param effectCallback - The effect's code
 */
export declare const inPlay: <Meta extends {
    id: string;
    type: import("./enums").CardType;
    name: string;
    colors: [import("./enums").CardColor, ...import("./enums").CardColor[]];
}, LocalState>(ctx: CardScriptContext<Meta, LocalState>, effectCallback: () => void) => void;
/**
 * Modifier that applies the effect only if the current card is at the top of its stack
 * @param ctx - The card context
 * @param effectCallback - The effect's code
 */
export declare const whenTopOfStack: <Meta extends {
    id: string;
    type: import("./enums").CardType;
    name: string;
    colors: [import("./enums").CardColor, ...import("./enums").CardColor[]];
}, LocalState>(ctx: CardScriptContext<Meta, LocalState>, effectCallback: () => void) => void;
/**
 * Extended modifier that applies the effect once per turn, based on a given guard
 * @param ctx - The card context
 * @param optProp - The local state property used to keep track of activations
 * @param effectCallback - The effect's code
 */
export declare const oncePerTurn: {
    <Meta extends {
        id: string;
        type: import("./enums").CardType;
        name: string;
        colors: [import("./enums").CardColor, ...import("./enums").CardColor[]];
    }, LocalState extends object, Key extends BooleanKeys<LocalState>>(ctx: CardScriptContext<Meta, LocalState>, optProp: Key, effectCallback: () => void): void;
    /**
     * Curry the {@link oncePerTurn} modifier for the given key
     * @param key - The local state property used to keep track of activations
     */
    via<Meta_1 extends {
        id: string;
        type: import("./enums").CardType;
        name: string;
        colors: [import("./enums").CardColor, ...import("./enums").CardColor[]];
    }, LocalState_1 extends object, Key_1 extends BooleanKeys<LocalState_1>>(key: Key_1): ScriptModifier<Meta_1, LocalState_1>;
};
export declare const mainEffect: <Meta extends {
    id: string;
    type: import("./enums").CardType;
    name: string;
    colors: [import("./enums").CardColor, ...import("./enums").CardColor[]];
}, LocalState>(ctx: CardScriptContext<Meta, LocalState>, effectCallback: () => void) => void;
/**
 * Modifier that applies the effect only if the current card is not the top card of a stack
 * @param ctx - The card context
 * @param effectCallback - The effect's code
 */
export declare const inheritableEffect: <Meta extends {
    id: string;
    type: import("./enums").CardType;
    name: string;
    colors: [import("./enums").CardColor, ...import("./enums").CardColor[]];
}, LocalState = undefined>(ctx: CardScriptContext<Meta, LocalState>, effectCallback: () => void) => void;
