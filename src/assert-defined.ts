/** Asserts that a value is neither null nor undefined, narrowing its type accordingly. */
export function assertDefined<T>(value: T, message?: string): asserts value is NonNullable<T> {
  if (value === null || value === undefined) throw new Error(message ?? 'Expected value to be defined');
}
