/**
 * Runs `guard` on `value` and returns the narrowed value, throwing when it fails. The returning
 * counterpart to {@link assert}: use it to extract a trusted value from an `unknown` at a trust
 * boundary in one expression (`const user = parse(raw, isUserShape)`).
 *
 * @typeParam T - The type `guard` narrows to; the returned value has this type.
 * @param value - The value to check.
 * @param guard - A type guard that `value` must pass.
 * @param message - Optional error message used when the guard fails.
 * @returns `value`, narrowed to `T`.
 * @throws {Error} When `value` fails `guard`.
 */
export function parse<T>(value: unknown, guard: (item: unknown) => item is T, message?: string): T {
  if (!guard(value)) throw new Error(message ?? 'Expected value to pass guard');
  return value;
}
