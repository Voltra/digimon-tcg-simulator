import { EffectTrigger, EffectTurnCondition, EffectType } from "../enums/effects";
import { CardContext } from "@/cardDefs/types/context";

export interface EffectDefBase {
	type: EffectType;
	turnCondition?: EffectTurnCondition;
	oncePerTurn?: boolean;
	condition?: (ctx: CardContext) => boolean;
	script: (ctx: CardContext) => void;
}

export interface SecurityEffectDef extends EffectDefBase {
	type: EffectType.SECURITY;
}

export interface TriggeredEffectDef extends EffectDefBase {
	type: EffectType.TRIGGERED;
	trigger: EffectTrigger;
}

export interface InterruptiveEffectDef extends EffectDefBase {
	type: EffectType.INTERRUPTIVE;
	trigger: EffectTrigger;
}

export interface ContinuousEffectDef extends EffectDefBase {
	type: EffectType.CONTINUOUS;
}

export type EffectDef = SecurityEffectDef
	| TriggeredEffectDef
	| InterruptiveEffectDef
	| ContinuousEffectDef;
