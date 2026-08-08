/**
 * Narrows an unknown value to `null`.
 *
 * @param value - The value to check.
 * @returns `true` when `value === null`; narrows `value` to `null`.
 */
export function isNull(value: unknown): value is null {
  return value === null;
}
