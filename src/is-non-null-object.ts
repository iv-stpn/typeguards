/**
 * Narrows `unknown` to any non-null `object` (arrays included), exposing string-keyed properties
 * for probing. Mirrors `typeof value === 'object' && value !== null`.
 *
 * @param value - The value to check.
 * @returns `true` when `value` is a non-null object, narrowing it to `Record<string, unknown>`.
 */
export function isNonNullObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
