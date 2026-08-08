import { isObject } from './is-object.js';

/**
 * Narrows `unknown` to an object whose own properties each pass the corresponding guard in `shape` —
 * a declarative per-key schema check for trust boundaries. Extra keys are allowed; missing keys,
 * arrays, and non-objects are rejected. An empty shape matches any non-null, non-array object.
 */
export function isObjectOf<T extends Record<string, unknown>>(
  value: unknown,
  shape: { [K in keyof T]: (item: unknown) => item is T[K] },
): value is T {
  if (!isObject(value)) return false;
  for (const [key, guard] of Object.entries(shape)) {
    if (!Object.hasOwn(value, key)) return false;
    if (!guard(value[key])) return false;
  }
  return true;
}
