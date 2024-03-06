import { DigitamaDeckCard } from "./cards/DigitamaDeckCard";
import { meta } from "../meta";
import { DigitamaDeckSizeLimitExceeded, MainDeckSizeError } from "./errors";
import { MainDeckCard } from "./cards/MainDeckCard";

/**
 * @param digitamaDeck - The digitama deck to inspect
 * @throws {DigitamaDeckSizeLimitExceeded} If there are too many digitamas in the deck
 */
export const ensureDigitamaDeckIsValid = (digitamaDeck: DigitamaDeckCard[]) => {
	if (digitamaDeck.length > meta.digitamaDeckSizeLimit) {
		throw new DigitamaDeckSizeLimitExceeded(digitamaDeck.length);
	}
};

/**
 * Ensure that the provided main deck is valid
 * @param mainDeck - The main deck to inspect
 * @throws {MainDeckSizeError} If the main deck doesn't contain exactly 50 cards
 */
export const ensureMainDeckIsValid = (mainDeck: MainDeckCard[]) => {
	if (mainDeck.length !== meta.mainDeckSize) {
		throw new MainDeckSizeError(mainDeck.length);
	}
};
