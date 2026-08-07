/** Narrows to any non-null `object` (arrays included), exposing string-keyed properties for probing. Mirrors `typeof value === 'object' && value !== null`. */
export function isNonNullObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
