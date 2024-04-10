import { ValuesOf } from "../../types";
import { DigimonTrait } from "./digimons";
import { OptionTrait } from "./options";
import { TamerTrait } from "./tamers";

export enum CardLocation {
	EGG_DECK = "egg deck",
	DECK = "deck",
	RAISING = "raising",
	PLAY_AREA = "play area",
	TRASH = "trash",
}

export enum CardColor {
	BLACK = "Black",
	GREEN = "Green",
	PURPLE = "Purple",
	RED = "Red",
	WHITE = "White",
	YELLOW = "Yellow",
}

export enum CardType {
	DIGIMON = "Digimon",
	DIGI_EGG = "Digi-Egg",
	OPTION = "Option",
	TAMER = "Tamer",
}

export const CardTrait = Object.freeze({
	...DigimonTrait,
	...OptionTrait,
	...TamerTrait,
} as const);
export type CardTrait = ValuesOf<typeof CardTrait>;
