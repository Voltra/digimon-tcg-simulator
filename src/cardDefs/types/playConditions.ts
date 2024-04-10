import { CardColor } from "../enums/cards";

export interface DigimonPlayCondition {
	playCost: number;
}

export interface OptionPlayCondition {
	cost: number;
	colors?: CardColor[];
}

export interface TamerPlayCondition {
	playCost: number;
}

export type DigiEggPlayCondition = never;

export type PlayCondition = DigiEggPlayCondition | DigimonPlayCondition | OptionPlayCondition | TamerPlayCondition;
