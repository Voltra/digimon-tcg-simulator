import { Decklist } from "../deck/Decklist";
import { LobbyDeck } from "./LobbyDeck";

export class LobbyPlayer {
	public readonly deck: LobbyDeck;

	public constructor(
		public readonly id: string,
		deckList: Decklist,
	) {
		this.deck = LobbyDeck.fromDecklist(deckList);
	}

	public shuffleDecks() {}
}
