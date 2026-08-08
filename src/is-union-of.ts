/**
 * Narrows `unknown` to the union of the types guarded by `guards` — true when at least one guard
 * passes (first match wins). Each guard narrows independently, so the result type is their union.
 * An empty guard list never matches.
 */
export function isUnionOf<T extends readonly unknown[]>(
  value: unknown,
  ...guards: { [K in keyof T]: (item: unknown) => item is T[K] }
): value is T[number] {
  return guards.some((guard) => guard(value));
}
