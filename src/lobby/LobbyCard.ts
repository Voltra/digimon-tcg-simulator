import { Card } from "../deck/cards/Card";
import { EntityId } from "../types";

export class LobbyCard {
	public static fromCard(lobbyCardId: EntityId, card: Card): LobbyCard {
		return new this(lobbyCardId, card);
	}

	public static clone(card: LobbyCard): LobbyCard {
		return this.fromCard(card.id, card.card);
	}

	private constructor(
		public readonly id: EntityId,
		public readonly card: Card
	) {
	}
}
