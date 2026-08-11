/**
 * Typed wrapper around `Object.keys()`. The TS standard library types `Object.keys` as returning
 * `string[]` even though the keys of a known object are known at compile time. This wrapper
 * re-asserts the narrower key type so callers don't need inline casts.
 *
 * @typeParam T - The object type whose keys are enumerated.
 * @param obj - The object to inspect.
 * @returns The own enumerable string keys of `obj`, typed as `(keyof T)[]`.
 */
export function objectKeys<T extends object>(obj: T): (keyof T)[] {
  // biome-ignore lint: Object.keys() returns string[] per the TS spec — this is a safe re-assertion over a known object shape
  return Object.keys(obj) as (keyof T)[];
}
