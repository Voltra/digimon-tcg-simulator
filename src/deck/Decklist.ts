import { MainDeckCard } from "./cards/MainDeckCard";
import { DigitamaDeckCard } from "./cards/DigitamaDeckCard";
import { ensureDigitamaDeckIsValid, ensureMainDeckIsValid } from "./validation";

export class Decklist {
	public constructor(
		public readonly id: string,
		public readonly mainDeck: MainDeckCard[],
		public readonly digitamaDeck: DigitamaDeckCard[],
	) {
		ensureDigitamaDeckIsValid(this.digitamaDeck);
		ensureMainDeckIsValid(this.mainDeck);
	}
}
