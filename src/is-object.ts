/**
 * Narrows `unknown` to a non-null, non-array object. Excludes arrays, so use it when you
 * specifically don't want array values.
 *
 * @param value - The value to check.
 * @returns `true` when `value` is an object that is neither `null` nor an array; narrows `value`
 *   to `Record<string, unknown>`.
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
