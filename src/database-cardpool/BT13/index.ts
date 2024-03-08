import { asSequence } from "sequency";
import bt13_009 from "./BT13-009"

const cardDefinitions= [bt13_009] as const;

export const bt13Cards = asSequence(cardDefinitions)
	.associateBy(_ => _.id);
