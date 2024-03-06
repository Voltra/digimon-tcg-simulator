export class InvalidArgumentError extends TypeError {
	public constructor(msg = "Invalid argument") {
		super(msg);
	}
}
