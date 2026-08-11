/**
 * Creates an empty record backed by a prototype-less object (`Object.create(null)`). Unlike a
 * plain `{}`, a key of `"__proto__"` cannot pollute the prototype chain, and the result has no
 * inherited members — the safe initial value when building a `Record<K, V>` from untrusted keys.
 *
 * @typeParam K - The key type of the record; usually `string`.
 * @typeParam V - The value type of the record.
 * @returns A new, empty `Record<K, V>` whose prototype is `null`.
 */
export function createEmptyRecord<K extends PropertyKey, V>(): Record<K, V> {
  // biome-ignore lint: an initial record value cannot be typed as `Record<K, V>` because it starts empty
  return Object.create(null) as Record<K, V>;
}
