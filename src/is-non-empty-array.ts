/**
 * Narrows `unknown` to a non-empty array. Useful after `isArray` when downstream code assumes at
 * least one element (e.g. indexing `[0]`) and wants the compiler to enforce that assumption.
 */
export function isNonEmptyArray<T = unknown>(value: unknown): value is [T, ...T[]] {
  return Array.isArray(value) && value.length > 0;
}
