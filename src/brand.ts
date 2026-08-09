declare const brand: unique symbol;

/**
 * A nominal brand: `Brand<T, B>` is `T` plus a phantom brand `B` that keeps the type distinct
 * from plain `T` at compile time without existing at runtime. Produce values with
 * {@link brandGuard} (or any other guard narrowing to `Brand<T, B>`); the brand key is a
 * private symbol, so object literals cannot accidentally satisfy it.
 *
 * @typeParam T - The underlying type being branded (e.g. `string`).
 * @typeParam B - A string literal naming the brand (e.g. `'UserId'`).
 */
export type Brand<T, B extends string> = T & { readonly [brand]: B };

/**
 * Wraps `guard` so that passing values narrow to `Brand<T, B>` instead of `T` — the standard way
 * to give a runtime guard a nominal brand. The brand name argument only supplies the brand at
 * the type level; the returned guard behaves exactly like `guard`.
 *
 * @typeParam T - The underlying type of the brand.
 * @typeParam B - The brand name as a string literal type.
 * @param guard - The base type guard whose passes are branded.
 * @param _brandName - The brand name; its literal type becomes `B` (compile-time only).
 * @returns A type guard narrowing `unknown` to `Brand<T, B>`.
 */
export function brandGuard<T, B extends string>(
  guard: (item: unknown) => item is T,
  _brandName: B,
): (value: unknown) => value is Brand<T, B> {
  return (value): value is Brand<T, B> => guard(value);
}
