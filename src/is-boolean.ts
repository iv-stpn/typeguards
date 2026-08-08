/**
 * Narrows an unknown value to a `boolean`.
 *
 * @param value - The value to check.
 * @returns `true` when `typeof value === 'boolean'`; narrows `value` to `boolean`.
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}
