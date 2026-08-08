/**
 * Narrows `unknown` to a non-empty array. Useful after `isArray` when downstream code assumes at
 * least one element (e.g. indexing `[0]`) and wants the compiler to enforce that assumption.
 *
 * @typeParam T - The element type of the resulting non-empty tuple. Defaults to `unknown`.
 * @param value - The value to check.
 * @returns `true` when `value` is an array with at least one element; narrows `value` to
 *   `[T, ...T[]]`.
 */
export function isNonEmptyArray<T = unknown>(value: unknown): value is [T, ...T[]] {
  return Array.isArray(value) && value.length > 0;
}
