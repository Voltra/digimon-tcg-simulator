import { createActor, setup } from "xstate";

export enum LobbyState {
	// Initial
	INITIAL = "Initial",

	// Intermediate
	P1_WON_R1 = "P1 won round 1",
	P2_WON_R1 = "P2 won round 1",
	P1_WON_R1__P2_WON_R2 = "P1 won round 1, P2 won round 2",
	P2_WON_R1__P1_WON_R2 = "P2 won round 1, P1 won round 2",

	// Final
	P1_WON_FLAWLESS = "P1 won flawless",
	P2_WON_FLAWLESS = "P2 won flawless",
	P1_WON_R1_R3 = "P1 won round 1 and 3",
	P2_WON_R2_R3 = "P2 won round 2 and 3",
	P2_WON_R1_R3 = "P2 won round 1 and 3",
	P1_WON_R2_R3 = "P1 won round 2 and 3",
}

export enum LobbyStateTransition {
	P1_WINS = "p1 win",
	P2_WINS = "p2 win",
}

export const createLobbyStateMachine = (id: string) => {
	const machine = setup({
		types: {
			context: {} as {},
			events: {} as { type: LobbyStateTransition },
		},
		schemas: {
			events: {
				[LobbyStateTransition.P1_WINS]: {
					type: "object",
					properties: {},
				},
				[LobbyStateTransition.P2_WINS]: {
					type: "object",
					properties: {},
				},
			},
		},
	}).createMachine({
		context: {},
		id: `LobbyState--${id}`,
		initial: LobbyState.INITIAL,
		states: {
			[LobbyState.INITIAL]: {
				on: {
					[LobbyStateTransition.P1_WINS]: {
						target: LobbyState.P1_WON_R1,
					},
					[LobbyStateTransition.P2_WINS]: {
						target: LobbyState.P2_WON_R1,
					},
				},
			},
			[LobbyState.P1_WON_R1]: {
				on: {
					[LobbyStateTransition.P1_WINS]: {
						target: LobbyState.P1_WON_FLAWLESS,
					},
					[LobbyStateTransition.P2_WINS]: {
						target: LobbyState.P1_WON_R1__P2_WON_R2,
					},
				},
			},
			[LobbyState.P2_WON_R1]: {
				on: {
					[LobbyStateTransition.P2_WINS]: {
						target: LobbyState.P2_WON_FLAWLESS,
					},
					[LobbyStateTransition.P1_WINS]: {
						target: LobbyState.P2_WON_R1__P1_WON_R2,
					},
				},
			},
			[LobbyState.P1_WON_FLAWLESS]: {
				type: "final",
			},
			[LobbyState.P1_WON_R1__P2_WON_R2]: {
				on: {
					[LobbyStateTransition.P1_WINS]: {
						target: LobbyState.P1_WON_R1_R3,
					},
					[LobbyStateTransition.P2_WINS]: {
						target: LobbyState.P2_WON_R2_R3,
					},
				},
			},
			[LobbyState.P2_WON_FLAWLESS]: {
				type: "final",
			},
			[LobbyState.P2_WON_R1__P1_WON_R2]: {
				on: {
					[LobbyStateTransition.P2_WINS]: {
						target: LobbyState.P2_WON_R1_R3,
					},
					[LobbyStateTransition.P1_WINS]: {
						target: LobbyState.P1_WON_R2_R3,
					},
				},
			},
			[LobbyState.P1_WON_R1_R3]: {
				type: "final",
			},
			[LobbyState.P2_WON_R2_R3]: {
				type: "final",
			},
			[LobbyState.P2_WON_R1_R3]: {
				type: "final",
			},
			[LobbyState.P1_WON_R2_R3]: {
				type: "final",
			},
		},
	});

	return createActor(machine);
};

export type LobbyStateMachine = ReturnType<typeof createLobbyStateMachine>;
