/**
 * Narrows an unknown value to a `number`, excluding `NaN`.
 *
 * @param value - The value to check.
 * @returns `true` when `typeof value === 'number'` and `value` is not `NaN`; narrows `value` to `number`.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}
