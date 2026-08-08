/**
 * Narrows `unknown` to an array whose elements all pass `itemGuard` — a type-guard replacement for
 * `Array.prototype.every` that also rejects sparse arrays (holes are treated as failures). Empty
 * arrays always pass. Pairs with {@link isArray} when element types matter at trust boundaries.
 */
export function isArrayOf<T>(value: unknown, itemGuard: (item: unknown) => item is T): value is T[] {
  if (!Array.isArray(value)) return false;
  for (const item of value) {
    if (!itemGuard(item)) return false;
  }
  return true;
}
