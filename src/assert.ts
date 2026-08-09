/**
 * Asserts that `value` passes `guard`, narrowing it to the guard's type or throwing. The
 * assertion counterpart to {@link parse}: use it when the narrowed value should keep flowing in
 * the existing variable rather than be returned.
 *
 * @typeParam T - The type `guard` narrows to; `value` is narrowed to it on success.
 * @param value - The value to check.
 * @param guard - A type guard that `value` must pass.
 * @param message - Optional error message used when the assertion fails.
 * @returns Nothing — the function either returns `void` or throws.
 * @throws {Error} When `value` fails `guard`.
 */
export function assert<T>(value: unknown, guard: (item: unknown) => item is T, message?: string): asserts value is T {
  if (!guard(value)) throw new Error(message ?? 'Expected value to pass guard');
}
