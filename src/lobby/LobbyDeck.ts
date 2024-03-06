import { Decklist } from "../deck/Decklist";
import { LobbyMainDeck } from "./LobbyMainDeck";
import { LobbyCard } from "./LobbyCard";

export class LobbyDeck {
	public static fromDecklist(deckList: Decklist): LobbyDeck {
		const mainDeck = LobbyMainDeck.fromDecklist(deckList);
		return new this(
			deckList.mainDeck.map((card, index) => LobbyCard.fromCard(
				`${deckList.id}--mainDeck--card-${card.id}--${index}`,
				card,
			)),
			deckList.digitamaDeck.map((card, index) => LobbyCard.fromCard(
				`${deckList.id}--digitamaDeck--card-${card.id}--${index}`,
				card,
			))
		);
	}

	private static cloneCardArray(arr: Readonly<LobbyCard[]>): LobbyCard[] {
		return arr.map(LobbyCard.clone);
	}

	private initialMainDeck: Readonly<LobbyCard[]>;
	private initialDigitamaDeck: Readonly<LobbyCard[]>;

	public readonly mainDeck: LobbyCard[];
	public readonly digitamaDeck: LobbyCard[];

	public constructor(
		mainDeck: LobbyCard[],
		digitamaDeck: LobbyCard[]
	) {
		this.initialMainDeck = Object.freeze(LobbyDeck.cloneCardArray(mainDeck));
		this.initialDigitamaDeck = Object.freeze(LobbyDeck.cloneCardArray(digitamaDeck));

		this.mainDeck = LobbyDeck.cloneCardArray(this.initialMainDeck);
		this.digitamaDeck = LobbyDeck.cloneCardArray(this.initialDigitamaDeck);
	}

	public shuffleDecks() {}

	public shuffleMainDeck() {}

	public shuffleDigitamaDeck() {}
}
