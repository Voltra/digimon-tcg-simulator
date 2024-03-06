import { InvalidArgumentError } from "../errors";
import { EntityId } from "../types";

export class SelfLobbyError extends InvalidArgumentError {
	public readonly lobbyId: EntityId;
	public readonly playerId: EntityId;

	constructor({
		lobbyId,
		playerId,
	}: { lobbyId: EntityId, playerId: EntityId }) {
		super(`Tried to create a lobby (#${lobbyId}) with yourself (player #${playerId})`);

		this.lobbyId = lobbyId;
		this.playerId = playerId;
	}
}
