/**
 * Returns `true` when `array` contains `value`, narrowing `value` to the array's element type.
 * A type-guard replacement for `Array.prototype.includes` that narrows the checked value.
 *
 * @typeParam T - The element type of `array`; `value` is narrowed to it on success.
 * @param array - The array to search.
 * @param value - The value to look for.
 * @returns `true` when `array` contains `value` (strict equality), narrowing `value` to `T`.
 */
export function isInArray<T>(array: readonly T[], value: unknown): value is T {
  for (let i = 0; i < array.length; i += 1) if (array[i] === value) return true;
  return false;
}
