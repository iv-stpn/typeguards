/** Narrows to a non-null, non-array object. Excludes arrays, so use it when you specifically don't want array values. */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
