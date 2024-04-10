import {
	DigiEggPlayCondition,
	DigimonPlayCondition,
	OptionPlayCondition,
	PlayCondition,
	TamerPlayCondition,
} from "./playConditions";
import { EffectDef, SecurityEffectDef } from "./effects";
import { CardColor, CardTrait, CardType } from "../enums/cards";
import { DigimonAttribute, DigimonForm, DigimonLevel, DigimonTrait } from "../enums/digimons";
import { DigivolutionCondition } from "@/cardDefs/types/digivolutionConditions";
import { NonEmptyArr } from "@/types";

export interface GameCardBase {
	cardType: CardType;
	id: string;
	names: string[];
	colors: CardColor[];
	playConditions: PlayCondition[];
	traits: CardTrait[];
	cardText: {
		security: string,
		trash: string;
		main: string,
		inheritable: string;
	};
	effects: {
		breeding: EffectDef[];
		trash: EffectDef[];
		security: SecurityEffectDef[];
		main: EffectDef[];
		inheritable: EffectDef[];
	};

	getNames(): string[];
	getColors(): CardColor[];
}

export interface DigiEggGameCard extends GameCardBase {
	cardType: CardType.DIGI_EGG;
	level: DigimonLevel.EGG;
	dp: number;
	playConditions: DigiEggPlayCondition[];
	digimonForms: DigimonForm[];
	digimonAttribute: DigimonAttribute[];
	traits: DigimonTrait[];
}

export interface DigimonGameCard extends GameCardBase {
	cardType: CardType.DIGIMON;
	level: DigimonLevel;
	dp: number;
	playConditions: NonEmptyArr<DigimonPlayCondition>;
	digivolutionConditions: DigivolutionCondition[];
	digimonForms: DigimonForm[];
	digimonAttribute: NonEmptyArr<DigimonAttribute>;
	traits: NonEmptyArr<DigimonTrait>;
}

export interface OptionGameCard extends GameCardBase {
	cardType: CardType.OPTION;
	playConditions: NonEmptyArr<OptionPlayCondition>;
}

export interface TamerGameCard extends GameCardBase {
	cardType: CardType.TAMER;
	playConditions: NonEmptyArr<TamerPlayCondition>;
}

export type GameCard = DigiEggGameCard | DigimonGameCard | OptionGameCard | TamerGameCard;
