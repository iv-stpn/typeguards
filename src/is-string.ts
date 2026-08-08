/**
 * Narrows an unknown value to a `string`.
 *
 * @param value - The value to check.
 * @returns `true` when `typeof value === 'string'`; narrows `value` to `string`.
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}
