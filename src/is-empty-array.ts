/**
 * Narrows `unknown[]` to the empty tuple type `[]`.
 *
 * @param value - The array to check.
 * @returns `true` when `value` is an empty array, narrowing it to `[]`.
 */
export function isEmptyArray(value: unknown[]): value is [] {
  return value.length === 0;
}
