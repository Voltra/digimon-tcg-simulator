import { none, Option } from "fp-ts/Option";
import { LobbyCard } from "./LobbyCard";
import { Card } from "../deck/cards/Card";
import { Decklist } from "../deck/Decklist";

export class LobbyMainDeck {
	public static fromDecklist(deckList: Decklist): LobbyMainDeck {
		return new this(deckList);
	}

	private cards: LobbyCard[];

	private constructor(
		public readonly deckList: Decklist
	) {
		this.cards = deckList.mainDeck.map((card, index) => LobbyCard.fromCard(
			`${deckList.id}--mainDeck--card-${card.id}--${index}`,
			card,
		));
	}

	public draw(): Option<LobbyCard> {
		const card = this.cards.shift();
	}

	public returnToTop(card: LobbyCard): this {
		this.cards.unshift(card);
		return this;
	}

	public returnToBottom(card: LobbyCard): this {
		this.cards.push(card);
		return this;
	}
}
