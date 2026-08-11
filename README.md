# @iv-stpn/typeguards

[![CI](https://github.com/iv-stpn/typeguards/actions/workflows/ci.yml/badge.svg)](https://github.com/iv-stpn/typeguards/actions/workflows/ci.yml) [![Coverage](https://img.shields.io/badge/coverage-100%25-2ea44f)](https://github.com/iv-stpn/typeguards/actions/workflows/ci.yml) [![npm version](https://img.shields.io/npm/v/@iv-stpn/typeguards)](https://www.npmjs.com/package/@iv-stpn/typeguards)

Zero-dependency runtime type guards for TypeScript. Narrow `unknown` values at
trust boundaries — parsed JSON, webhook payloads, API responses, storage reads.

```ts
import { isObjectOf, isString, isNumber } from '@iv-stpn/typeguards';

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
bun add @iv-stpn/typeguards
# or
npm install @iv-stpn/typeguards
```

## Usage

```ts
import { isObject, isString } from '@iv-stpn/typeguards';
// or import only what you use, per guard:
import { isObject } from '@iv-stpn/typeguards/is-object';
import { isString } from '@iv-stpn/typeguards/is-string';

function parseConfig(raw: unknown) {
  if (!isObject(raw)) throw new Error('expected an object');
  if (!isString(raw.name)) throw new Error('expected a name');
  return raw; // narrowed to { name: string; ... }
}
```

Type guards narrow the value in the `if` branch:

```ts
import { isNonEmptyArray } from '@iv-stpn/typeguards';

function first(raw: unknown): unknown {
  if (!isNonEmptyArray(raw)) throw new Error('expected a non-empty array');
  return raw[0]; // raw is [unknown, ...unknown[]] — indexing is safe
}
```

## Guards

| Import | Narrows to | Checks |
| --- | --- | --- |
| `@iv-stpn/typeguards/is-object` | `Record<string, unknown>` | non-null, non-array object |
| `@iv-stpn/typeguards/is-object-of` | `T` | every own property passes its guard in `shape` |
| `@iv-stpn/typeguards/is-non-null-object` | `Record<string, unknown>` | any non-null object (arrays included) |
| `@iv-stpn/typeguards/is-record` | `Record<string, unknown>` | plain object (prototype `Object.prototype` or `null`); class instances rejected |
| `@iv-stpn/typeguards/is-null` | `null` | `value === null` |
| `@iv-stpn/typeguards/is-undefined` | `undefined` | `value === undefined` |
| `@iv-stpn/typeguards/is-union-of` | `T[number]` | at least one of `guards` passes |
| `@iv-stpn/typeguards/is-string` | `string` | `typeof === 'string'` |
| `@iv-stpn/typeguards/is-number` | `number` | `typeof === 'number'` and not `NaN` |
| `@iv-stpn/typeguards/is-finite-number` | `number` | `typeof === 'number'`, not `NaN`, not `±Infinity` |
| `@iv-stpn/typeguards/is-integer` | `number` | `Number.isInteger` |
| `@iv-stpn/typeguards/is-boolean` | `boolean` | `typeof === 'boolean'` |
| `@iv-stpn/typeguards/is-function` | `(...args: never[]) => unknown` | `typeof === 'function'` |
| `@iv-stpn/typeguards/is-array` | `T[]` | `Array.isArray` |
| `@iv-stpn/typeguards/is-array-of` | `T[]` | every element passes the item guard (sparse arrays rejected) |
| `@iv-stpn/typeguards/is-non-empty-array` | `[T, ...T[]]` | array with at least one element |
| `@iv-stpn/typeguards/is-empty-array` | `[]` | array with no elements |
| `@iv-stpn/typeguards/is-in-array` | `T` | `value` is one of the array's elements |
| `@iv-stpn/typeguards/is-one-of` | `T[number]` | `value` strictly equals one of the literal `options` |
| `@iv-stpn/typeguards/is-tuple` | `T` | array length matches `guards`; each element passes its positional guard |
| `@iv-stpn/typeguards/has-key` | `Record<K, unknown>` | `key` is an own property of `value` |
| `@iv-stpn/typeguards/is-api-error-response` | `ApiErrorResponse` | `{ error: string; code?: string; requestId?: string }` |
| `@iv-stpn/typeguards/assert-defined` | `NonNullable<T>` (asserts) | throws if `value` is `null`/`undefined` |
| `@iv-stpn/typeguards/assert` | `T` (asserts) | throws if `value` fails `guard` |
| `@iv-stpn/typeguards/parse` | `T` | returns the narrowed value or throws if `guard` fails |
| `@iv-stpn/typeguards/brand` | `Brand<T, B>` | `brandGuard(guard, 'Name')` narrows to a nominal brand |

All guards accept `unknown` (except `isEmptyArray`/`isInArray`/`hasKey`, which
take already-typed inputs) and are safe to use on parsed JSON.

## Utilities

Generic helpers that pair with the guards — no narrowing, but the same
one-file-per-export, tree-shakeable layout.

| Import | Returns | Behaviour |
| --- | --- | --- |
| `@iv-stpn/typeguards/object-keys` | `(keyof T)[]` | typed `Object.keys` — own enumerable string keys, without the `string[]` cast callers would otherwise need |
| `@iv-stpn/typeguards/create-empty-record` | `Record<K, V>` | fresh prototype-less record (`Object.create(null)`) — safe initial value when building a map from untrusted keys |

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
