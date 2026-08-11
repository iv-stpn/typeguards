# typeguards

[![CI](https://github.com/iv-stpn/typeguards/actions/workflows/ci.yml/badge.svg)](https://github.com/iv-stpn/typeguards/actions/workflows/ci.yml) [![Coverage](https://img.shields.io/badge/coverage-100%25-2ea44f)](https://github.com/iv-stpn/typeguards/actions/workflows/ci.yml) [![npm version](https://img.shields.io/npm/v/typeguards)](https://www.npmjs.com/package/typeguards)

Zero-dependency runtime type guards for TypeScript. Narrow `unknown` values at
trust boundaries — parsed JSON, webhook payloads, API responses, storage reads.

```ts
import { isObjectOf, isString, isNumber } from 'typeguards';

function parseUser(raw: unknown) {
  // `raw` could be anything — prove it before you trust it
  if (!isObjectOf(raw, { name: isString, age: isNumber })) {
    throw new Error('malformed user payload');
  }
  // raw is now narrowed to { name: string; age: number } — safe property access
  return `${raw.name} (${raw.age})`;
}
```

Each guard lives in its **own file and its own package export**, so bundlers
only ship the guards you actually import.

## Install

```bash
bun add typeguards
# or
npm install typeguards
```

## Usage

```ts
import { isObject, isString } from 'typeguards';
// or import only what you use, per guard:
import { isObject } from 'typeguards/is-object';
import { isString } from 'typeguards/is-string';

function parseConfig(raw: unknown) {
  if (!isObject(raw)) throw new Error('expected an object');
  if (!isString(raw.name)) throw new Error('expected a name');
  return raw; // narrowed to { name: string; ... }
}
```

Type guards narrow the value in the `if` branch:

```ts
import { isNonEmptyArray } from 'typeguards';

function first(raw: unknown): unknown {
  if (!isNonEmptyArray(raw)) throw new Error('expected a non-empty array');
  return raw[0]; // raw is [unknown, ...unknown[]] — indexing is safe
}
```

## Guards

| Import | Narrows to | Checks |
| --- | --- | --- |
| `typeguards/is-object` | `Record<string, unknown>` | non-null, non-array object |
| `typeguards/is-object-of` | `T` | every own property passes its guard in `shape` |
| `typeguards/is-non-null-object` | `Record<string, unknown>` | any non-null object (arrays included) |
| `typeguards/is-record` | `Record<string, unknown>` | plain object (prototype `Object.prototype` or `null`); class instances rejected |
| `typeguards/is-null` | `null` | `value === null` |
| `typeguards/is-undefined` | `undefined` | `value === undefined` |
| `typeguards/is-union-of` | `T[number]` | at least one of `guards` passes |
| `typeguards/is-string` | `string` | `typeof === 'string'` |
| `typeguards/is-number` | `number` | `typeof === 'number'` and not `NaN` |
| `typeguards/is-finite-number` | `number` | `typeof === 'number'`, not `NaN`, not `±Infinity` |
| `typeguards/is-integer` | `number` | `Number.isInteger` |
| `typeguards/is-boolean` | `boolean` | `typeof === 'boolean'` |
| `typeguards/is-function` | `(...args: never[]) => unknown` | `typeof === 'function'` |
| `typeguards/is-array` | `T[]` | `Array.isArray` |
| `typeguards/is-array-of` | `T[]` | every element passes the item guard (sparse arrays rejected) |
| `typeguards/is-non-empty-array` | `[T, ...T[]]` | array with at least one element |
| `typeguards/is-empty-array` | `[]` | array with no elements |
| `typeguards/is-in-array` | `T` | `value` is one of the array's elements |
| `typeguards/is-one-of` | `T[number]` | `value` strictly equals one of the literal `options` |
| `typeguards/is-tuple` | `T` | array length matches `guards`; each element passes its positional guard |
| `typeguards/has-key` | `Record<K, unknown>` | `key` is an own property of `value` |
| `typeguards/is-api-error-response` | `ApiErrorResponse` | `{ error: string; code?: string; requestId?: string }` |
| `typeguards/assert-defined` | `NonNullable<T>` (asserts) | throws if `value` is `null`/`undefined` |
| `typeguards/assert` | `T` (asserts) | throws if `value` fails `guard` |
| `typeguards/parse` | `T` | returns the narrowed value or throws if `guard` fails |
| `typeguards/brand` | `Brand<T, B>` | `brandGuard(guard, 'Name')` narrows to a nominal brand |

All guards accept `unknown` (except `isEmptyArray`/`isInArray`/`hasKey`, which
take already-typed inputs) and are safe to use on parsed JSON.

## Utilities

Generic helpers that pair with the guards — no narrowing, but the same
one-file-per-export, tree-shakeable layout.

| Import | Returns | Behaviour |
| --- | --- | --- |
| `typeguards/object-keys` | `(keyof T)[]` | typed `Object.keys` — own enumerable string keys, without the `string[]` cast callers would otherwise need |
| `typeguards/create-empty-record` | `Record<K, V>` | fresh prototype-less record (`Object.create(null)`) — safe initial value when building a map from untrusted keys |

## Development

```bash
bun install
bun run lint         # biome
bun run typecheck    # tsc --noEmit
bun run test         # bun test — emits a V8 coverage report (coverage/lcov.info)
bun run test:coverage  # test + enforce the ≥90% line-coverage gate (what CI runs)
bun run badge:coverage # regenerate the README coverage badge from the latest run
bun run build        # tsup → dist (cjs + esm + dts)
```

Coverage is measured with bun's built-in V8 coverage (bunfig.toml); the shields.io
badge above is generated from `coverage/lcov.info`, so re-run `bun run badge:coverage`
after meaningful test changes. The coverage gate lives only in CI
(`test:coverage`) — plain `bun run test` never fails on coverage.

Releasing uses [changesets](https://github.com/changesets/changesets): run
`bun run changeset`, commit the generated file, and the `Release` workflow
creates a version PR; merging it publishes to npm.

## API

Full API reference: [docs/api.md](docs/api.md).

- `isObject(value)` — `value is Record<string, unknown>`
- `isObjectOf<T extends Record<string, unknown>>(value, shape)` — `value is T` when every own property passes its guard in `shape`
- `isNonNullObject(value)` — `value is Record<string, unknown>`
- `isRecord(value)` — `value is Record<string, unknown>` for plain objects
- `isNull(value)` — `value is null`
- `isUndefined(value)` — `value is undefined`
- `isUnionOf<T extends readonly unknown[]>(value, ...guards)` — `value is T[number]` when any guard passes
- `isString(value)` — `value is string`
- `isNumber(value)` — `value is number`
- `isFiniteNumber(value)` — `value is number`, excluding `NaN` and `±Infinity`
- `isInteger(value)` — `value is number` (`Number.isInteger`)
- `isBoolean(value)` — `value is boolean`
- `isFunction(value)` — `value is (...args: never[]) => unknown`
- `isArray<T = unknown>(value)` — `value is T[]`
- `isArrayOf<T>(value, itemGuard)` — `value is T[]` when every element passes `itemGuard`
- `isNonEmptyArray<T = unknown>(value)` — `value is [T, ...T[]]`
- `isEmptyArray(value: unknown[])` — `value is []`
- `isInArray<T>(array: readonly T[], value)` — `value is T`
- `isOneOf<T extends readonly unknown[]>(value, ...options)` — `value is T[number]` when strictly equal to one of `options`
- `isTuple<T extends readonly unknown[]>(value, ...guards)` — `value is T` when the array length matches and each element passes its positional guard
- `hasKey<K extends PropertyKey>(key: K, value)` — `value is Record<K, unknown>`
- `isApiErrorResponse(value)` — `value is ApiErrorResponse`
- `assertDefined<T>(value, message?)` — `asserts value is NonNullable<T>`
- `assert<T>(value, guard, message?)` — `asserts value is T`; throws when `guard` fails
- `parse<T>(value, guard, message?)` — returns the narrowed `T` or throws when `guard` fails
- `brandGuard<T, B extends string>(guard, brandName)` — `(value: unknown) => value is Brand<T, B>`
- `createEmptyRecord<K extends PropertyKey, V>()` — returns a prototype-less empty `Record<K, V>` (`Object.create(null)`), immune to `__proto__` pollution
- `objectKeys<T extends object>(obj)` — `(keyof T)[]`, a typed wrapper around `Object.keys`

## License

MIT
