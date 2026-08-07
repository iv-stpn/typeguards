/** Narrows to any function value, including class constructors and callable objects. */
export function isFunction(value: unknown): value is (...args: never[]) => unknown {
  return typeof value === 'function';
}
