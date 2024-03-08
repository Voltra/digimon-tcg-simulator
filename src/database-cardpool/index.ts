import { asSequence } from "sequency";
import { promoCards } from "./PROMO";
import { bt7Cards } from "./BT7";
import { CardDefinition } from "./utils";
import { NewCardMeta } from "./schemas";
import { bt13Cards } from "./BT13";

export const databaseCardpool = asSequence([
	promoCards,
	bt7Cards,
	bt13Cards,
])
	.flatMap(set => asSequence(set as unknown as Map<NewCardMeta["id"], CardDefinition<NewCardMeta>>))
	.toMap();
