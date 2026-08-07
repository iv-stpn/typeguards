/** Narrows `unknown[]` to the empty tuple type `[]`. */
export function isEmptyArray(value: unknown[]): value is [] {
  return value.length === 0;
}
