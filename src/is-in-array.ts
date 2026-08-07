/**
 * Returns `true` when `array` contains `value`, narrowing `value` to the array's element type.
 * A type-guard replacement for `Array.prototype.includes` that narrows the checked value.
 */
export function isInArray<T>(array: readonly T[], value: unknown): value is T {
  for (let i = 0; i < array.length; i += 1) if (array[i] === value) return true;
  return false;
}
