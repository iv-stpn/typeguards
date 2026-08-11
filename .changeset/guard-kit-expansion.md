---
"typeguards": minor
---

Add the next layer of guards and helpers, all exported from the root and as standalone subpaths:

- `isInteger(value)` — narrows to a `number` with no fractional part (`Number.isInteger`; `-0` passes).
- `isFiniteNumber(value)` — narrows to a finite `number`, rejecting `NaN` and `±Infinity`.
- `isRecord(value)` — narrows to a plain object (prototype `Object.prototype` or `null`), rejecting class instances and built-ins; the safe check for JSON-shaped data.
- `isOneOf(value, ...options)` — narrows to the literal union of `options` via strict equality; variadic counterpart to `isInArray` (`const` type parameter preserves literals).
- `isTuple(value, ...guards)` — narrows to a fixed-length tuple when the array length matches and every element passes its positional guard.
- `assert(value, guard, message?)` — generalizes `assertDefined` to any guard: throws when `guard` fails, narrowing `value` in place.
- `parse(value, guard, message?)` — returns the guard-narrowed value or throws, for one-expression extraction at trust boundaries.
- `brandGuard(guard, 'Name')` + the `Brand<T, B>` type — nominal branding on top of any guard (private-symbol brand key, not forgeable at runtime).
- `createEmptyRecord<K, V>()` — creates a prototype-less empty `Record<K, V>` (`Object.create(null)`), the safe initial value when building a map from untrusted keys (`__proto__` can't pollute).
- `objectKeys(obj)` — typed `Object.keys`: returns `(keyof T)[]` instead of `string[]`, so callers don't need inline casts.
