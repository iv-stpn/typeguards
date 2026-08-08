/**
 * Asserts that a value is neither `null` nor `undefined`, narrowing its type accordingly.
 * Throws an `Error` with the given message (or a default) when the assertion fails.
 *
 * @typeParam T - The type of the value being asserted, typically `T | null | undefined`.
 * @param value - The value to assert as defined.
 * @param message - Optional error message used when the assertion fails.
 * @returns Nothing — the function either returns `void` or throws.
 * @throws {Error} When `value` is `null` or `undefined`.
 */
export function assertDefined<T>(value: T, message?: string): asserts value is NonNullable<T> {
  if (value === null || value === undefined) throw new Error(message ?? 'Expected value to be defined');
}
