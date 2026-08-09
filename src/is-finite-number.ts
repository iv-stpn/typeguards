/**
 * Narrows `unknown` to a finite `number`, excluding `NaN` and `±Infinity`. Use when downstream
 * arithmetic or serialization must never see non-finite values; {@link isNumber} rejects `NaN`
 * but still accepts `±Infinity`.
 *
 * @param value - The value to check.
 * @returns `true` when `value` is a finite number; narrows `value` to `number`.
 */
export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}
