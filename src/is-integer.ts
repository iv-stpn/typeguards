/**
 * Narrows `unknown` to an integer `number` — a type-guard replacement for `Number.isInteger`.
 * Rejects `NaN`, `±Infinity`, and fractional values; `-0` passes because it is equal to `0`.
 * The narrowed type is still `number` (there is no integer type), so pair with a brand
 * ({@link brandGuard}) when callers must rely on integer semantics.
 *
 * @param value - The value to check.
 * @returns `true` when `value` is a number with no fractional part; narrows `value` to `number`.
 */
export function isInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value);
}
