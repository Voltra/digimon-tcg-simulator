import { createLobbyStateMachine, LobbyStateMachine, LobbyStateTransition } from "./LobbyState";
import { LobbyPlayer } from "./LobbyPlayer";
import { isSameIdAs } from "../types";
import { SelfLobbyError } from "./errors";

export class Lobby {
	/**
	 * The state machine instance (actor) for the lobby's state
	 * @private
	 */
	private stateMachine: LobbyStateMachine;

	public constructor(
		public readonly id: string,
		public readonly player1: LobbyPlayer,
		public readonly player2: LobbyPlayer,
	) {
		if (isSameIdAs(player1.id, player2.id)) {
			throw new SelfLobbyError({
				lobbyId: this.id,
				playerId: this.player1.id,
			});
		}

		this.stateMachine = createLobbyStateMachine(id);

		// [...]

		this.start();
	}

	public get aPlayerHasWon() {
		return this.stateMachine.getSnapshot().status === "done";
	}

	private start() {
		this.stateMachine.start();
	}

	private signalPlayer1Won() {
		return this.stateMachine.send({
			type: LobbyStateTransition.P1_WINS,
		});
	}

	private signalPlayer2Won() {
		return this.stateMachine.send({
			type: LobbyStateTransition.P2_WINS,
		});
	}
}
