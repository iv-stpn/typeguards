/**
 * Narrows `unknown` to one of the literal `options` — true when `value` is strictly equal to any
 * of them. The variadic counterpart to {@link isInArray} for inline literal unions (`'GET' |
 * 'POST' | ...`); prefer `isInArray` when the options already live in an `as const` array.
 *
 * @typeParam T - The tuple of literal options; the result type is `T[number]`.
 * @param value - The value to check.
 * @param options - The literal values `value` is compared against (strict equality).
 * @returns `true` when `value` equals one of `options`; narrows `value` to `T[number]`.
 */
export function isOneOf<const T extends readonly unknown[]>(value: unknown, ...options: T): value is T[number] {
  for (const option of options) {
    if (option === value) return true;
  }
  return false;
}
