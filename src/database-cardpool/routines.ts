import { CardScriptContext, GameCard } from "./utils";
import { NewCardMeta } from "./schemas";
import { isInPlay, isTopOfStack } from "./tests";

export interface GainBlitzOptions<LocalState = unknown> {
	digimon: GameCard<LocalState>;
	forTheStack: boolean;
}

export const gainBlitzForTheTurn = <Meta extends NewCardMeta, LocalState>(ctx: CardScriptContext<Meta, LocalState>, {
	digimon = ctx.card,
	forTheStack = true,
}: Partial<GainBlitzOptions> = {}) => {
	const check = () => forTheStack || isTopOfStack(digimon);

	const blitz = () => {
		ctx.actions.queueOptionalAction<GameCard<unknown>>(`Blitz with ${digimon.getName()}?`, {
			computeState: () => digimon!.stack.topCard(),
			canExecute: topCard => isInPlay(topCard) && check(),
			action: topCard => {
				ctx.actions.declareAttack(topCard, true);
			},
		});
	};

	let hasGivenBlitz = false;

	if (ctx.query.memory() < 0) {
		blitz();
		hasGivenBlitz = true;
	}

	ctx.thisPlayerEvents.onMemoryChangeThisTurn((fromMemory, toMemory) => {
		if (!hasGivenBlitz && toMemory < 0) {
			blitz();
			hasGivenBlitz = true;
		}
	});
};
