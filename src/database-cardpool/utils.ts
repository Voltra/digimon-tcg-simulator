import { CardType, NewCardMeta, newCardMetaSchema, NewDigimonMeta, newDigimonMetaSchema } from "./schemas";



export interface CardScriptContext<Meta extends NewCardMeta> {
	meta: Meta;
	card: any;

	[k: string]: any;
}

export type CardScript<Meta extends NewCardMeta> = (context: CardScriptContext<Meta>) => void;

export const registerNewCard = (meta: NewCardMeta, script: CardScript<NewCardMeta>) => {
	const validMeta = newCardMetaSchema()
		.passthrough()
		.parse(meta);

	return {
		...validMeta,
		script,
	};
};



export const registerNewDigimon = (meta: NewDigimonMeta, script: CardScript<NewDigimonMeta>) => {
	const validMeta = newDigimonMetaSchema()
		.passthrough()
		.parse({
			...meta,
			type: CardType.DIGIMON,
		});

	return registerNewCard(validMeta, script);
};
