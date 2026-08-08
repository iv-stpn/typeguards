/**
 * Narrows `unknown` to an array whose elements all pass `itemGuard` — a type-guard replacement
 * for `Array.prototype.every` that also rejects sparse arrays (holes are treated as failures).
 * Empty arrays always pass. Pairs with {@link isArray} when element types matter at trust
 * boundaries.
 *
 * @typeParam T - The element type that `itemGuard` narrows to.
 * @param value - The value to check.
 * @param itemGuard - A type guard applied to every element of `value`.
 * @returns `true` when `value` is an array and every element passes `itemGuard`; narrows `value`
 *   to `T[]`.
 */
export function isArrayOf<T>(value: unknown, itemGuard: (item: unknown) => item is T): value is T[] {
  if (!Array.isArray(value)) return false;
  for (const item of value) {
    if (!itemGuard(item)) return false;
  }
  return true;
}
