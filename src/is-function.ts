/**
 * Narrows `unknown` to any function value, including class constructors and callable objects.
 *
 * @param value - The value to check.
 * @returns `true` when `typeof value === 'function'`, narrowing it to a callable signature.
 */
export function isFunction(value: unknown): value is (...args: never[]) => unknown {
  return typeof value === 'function';
}
