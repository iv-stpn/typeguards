/**
 * Narrows `unknown` to an array. A type-guard replacement for `Array.isArray` that exposes the
 * element type for further probing at trust boundaries (parsed JSON, webhook payloads).
 */
export function isArray<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value);
}
