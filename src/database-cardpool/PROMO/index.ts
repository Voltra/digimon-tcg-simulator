import { asSequence } from "sequency";
import p016 from "./P-016"

const cardDefinitions= [p016] as const;

export const promoCards = asSequence(cardDefinitions)
	.associateBy(_ => _.id);
