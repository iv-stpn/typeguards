/**
 * Narrows `unknown` to a tuple of the types guarded by `guards` — true when `value` is an array
 * whose length exactly matches the number of guards and every element passes its positional
 * guard. Extra or missing elements are rejected, so this is the strict counterpart to
 * {@link isArrayOf} for fixed-length arrays (parsed coordinates, version tuples).
 *
 * @typeParam T - The tuple type described by `guards`; each position maps to the type its guard
 *   narrows to.
 * @param value - The value to check.
 * @param guards - One type guard per tuple position, applied in order.
 * @returns `true` when `value` is an array whose length equals `guards.length` and each element
 *   passes the guard at its index; narrows `value` to `T`.
 */
export function isTuple<T extends readonly unknown[]>(
  value: unknown,
  ...guards: { [K in keyof T]: (item: unknown) => item is T[K] }
): value is T {
  if (!Array.isArray(value) || value.length !== guards.length) return false;
  for (let index = 0; index < guards.length; index += 1) {
    const guard = guards[index];
    if (guard === undefined || !guard(value[index])) return false;
  }
  return true;
}
