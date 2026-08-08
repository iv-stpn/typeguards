/**
 * Narrows an unknown value to `undefined`.
 *
 * @param value - The value to check.
 * @returns `true` when `value === undefined`; narrows `value` to `undefined`.
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}
