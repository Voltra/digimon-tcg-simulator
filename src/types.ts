export type EntityId = string;

/**
 * Check whether {@link inspected} is the same ID as {@link expected}
 * @param inspected
 * @param expected
 * @returns inspected is expected
 */
export const isSameIdAs = <LhsId extends EntityId, RhsId extends EntityId>(inspected: LhsId, expected: RhsId): inspected is LhsId&RhsId => {
	// We want to compare IDs together, and unify types.
	// Typescript doesn't allow diamond casting (cf. TS2367).
	// As such we expect an error in the comparison below, but allow it.


	// @ts-expect-error
	return inspected === expected;
}
