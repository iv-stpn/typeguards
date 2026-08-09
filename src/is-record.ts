/**
 * Narrows `unknown` to a plain object — one whose prototype is `Object.prototype` or `null`.
 * Unlike {@link isObject}, this rejects class instances, `Date`, `Map`, and other exotic objects,
 * so it is the safe choice for JSON-shaped data where a custom prototype is suspicious. Arrays
 * are rejected, and the check is realm-independent (works for values from iframes or workers).
 *
 * @param value - The value to check.
 * @returns `true` when `value` is a plain, non-array object; narrows `value` to
 *   `Record<string, unknown>`.
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || Object.getPrototypeOf(prototype) === null;
}
