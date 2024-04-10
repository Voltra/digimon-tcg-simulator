import { CardColor, DigimonAttribute, DigimonLevel, DigimonTrait } from "@/cardDefs/enums";
import { NonEmptyArr } from "@/types";

export interface RegularDigivolutionCondition {
	color: CardColor;
	level: DigimonLevel;
	cost: number;
}

export interface NamedDigivolutionCondition {
	nameIs: string;
}

export interface NamesakeDigivolutionCondition {
	nameContains: string;
}

export interface HybridDigivolutionCondition {
	cost: number;
	color?: CardColor;
}

export interface TraitDigivolutionCondition {
	traits: NonEmptyArr<DigimonTrait>;
	color?: CardColor;
}

export interface AttributeDigivolutionCondition {
	attributes: NonEmptyArr<DigimonAttribute>;
	color?: CardColor;
}

export type DigivolutionCondition = RegularDigivolutionCondition
	| NamedDigivolutionCondition
	| NamesakeDigivolutionCondition
	| HybridDigivolutionCondition
	| TraitDigivolutionCondition
	| AttributeDigivolutionCondition;
