/**
 * Narrows `unknown` to an array. A type-guard replacement for `Array.isArray` that exposes the
 * element type for further probing at trust boundaries (parsed JSON, webhook payloads).
 *
 * @typeParam T - The element type of the resulting array. Defaults to `unknown` when not inferred.
 * @param value - The value to check.
 * @returns `true` when `value` is an array, narrowing it to `T[]`.
 */
export function isArray<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value);
}
