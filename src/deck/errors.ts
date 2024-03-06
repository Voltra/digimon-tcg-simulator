import { meta } from "../meta";

export class DigitamaDeckSizeLimitExceeded extends Error {
	public constructor(
		public readonly invalidSize: number
	) {
		super(`Digitama deck size limit exceeded: Max. ${meta.digitamaDeckSizeLimit}, got ${invalidSize}`);
	}
}

export class MainDeckSizeError extends Error {
	public constructor(
		public readonly invalidSize: number
	) {
		super(`Invalid main deck size: Expected ${meta.mainDeckSize}, got ${invalidSize}`);
	}
}
