# @iv-stpn/typeguards

## 0.0.1

### Patch Changes

- [#2](https://github.com/iv-stpn/typeguards/pull/2) [`29b5a48`](https://github.com/iv-stpn/typeguards/commit/29b5a4869948248a9ef27378b9015eefaa64ae67) Thanks [@iv-stpn](https://github.com/iv-stpn)! - Add the next layer of guards and helpers, all exported from the root and as standalone subpaths:

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

- [`7069806`](https://github.com/iv-stpn/typeguards/commit/70698064ae94a08a62b0a1d40119bd72163370eb) Thanks [@iv-stpn](https://github.com/iv-stpn)! - Add guarded composite type helpers: `isArrayOf(value, itemGuard)` narrows to `T[]` when every element passes the item guard (rejects sparse arrays), `isObjectOf(value, shape)` narrows to the shape's type when every own property passes its guard (extra keys allowed), and `isUnionOf(value, ...guards)` narrows to the union of the guarded types when any guard passes. Each is exported from the package root and as its own subpath (`@iv-stpn/typeguards/is-array-of`, `@iv-stpn/typeguards/is-object-of`, `@iv-stpn/typeguards/is-union-of`).

- [`089eef2`](https://github.com/iv-stpn/typeguards/commit/089eef2d8d240a993afb2f1c6cd73c3fe1e56a52) Thanks [@iv-stpn](https://github.com/iv-stpn)! - Initial release 0.0.1: zero-dependency runtime type guards — isObject, isNonNullObject, isNull, isUndefined, isString, isNumber, isBoolean, isFunction, isArray, isNonEmptyArray, isEmptyArray, isInArray, hasKey, isApiErrorResponse, assertDefined. One guard per file for maximum tree-shaking, each individually exported.
