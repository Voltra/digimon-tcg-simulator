import { asSequence } from "sequency";
import bt7_009 from "./BT7-009"

const cardDefinitions= [bt7_009] as const;

export const bt7Cards = asSequence(cardDefinitions)
	.associateBy(_ => _.id);
