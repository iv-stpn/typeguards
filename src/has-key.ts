/**
 * Narrows a union to the member(s) that declare `key` — a type-guard replacement for the `in`
 * operator's discriminated-union narrowing. Returns `true` only when `key` is an own property of
 * `obj`. For a plain boolean presence check where no type narrowing is needed, prefer
 * `Object.hasOwn(obj, key)` directly.
 *
 * @typeParam K - The property key to look up; the narrowed type is `Record<K, unknown>`.
 * @param key - The property key whose presence is checked.
 * @param obj - The value to inspect.
 * @returns `true` when `obj` is a non-null object that has `key` as an own property; narrows
 *   `obj` to `Record<K, unknown>`.
 */
export function hasKey<K extends PropertyKey>(key: K, obj: unknown): obj is Record<K, unknown> {
  return obj !== null && typeof obj === 'object' && Object.hasOwn(obj, key);
}
