# typeguards

Zero-dependency runtime type guards for TypeScript. Narrow `unknown` values at
trust boundaries — parsed JSON, webhook payloads, API responses, storage reads.

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
| `typeguards/is-non-null-object` | `Record<string, unknown>` | any non-null object (arrays included) |
| `typeguards/is-null` | `null` | `value === null` |
| `typeguards/is-undefined` | `undefined` | `value === undefined` |
| `typeguards/is-string` | `string` | `typeof === 'string'` |
| `typeguards/is-number` | `number` | `typeof === 'number'` and not `NaN` |
| `typeguards/is-boolean` | `boolean` | `typeof === 'boolean'` |
| `typeguards/is-function` | `(...args: never[]) => unknown` | `typeof === 'function'` |
| `typeguards/is-array` | `T[]` | `Array.isArray` |
| `typeguards/is-non-empty-array` | `[T, ...T[]]` | array with at least one element |
| `typeguards/is-empty-array` | `[]` | array with no elements |
| `typeguards/is-in-array` | `T` | `value` is one of the array's elements |
| `typeguards/has-key` | `Record<K, unknown>` | `key` is an own property of `value` |
| `typeguards/is-api-error-response` | `ApiErrorResponse` | `{ error: string; code?: string; requestId?: string }` |
| `typeguards/assert-defined` | `NonNullable<T>` (asserts) | throws if `value` is `null`/`undefined` |

All guards accept `unknown` (except `isEmptyArray`/`isInArray`/`hasKey`, which
take already-typed inputs) and are safe to use on parsed JSON.

## API

- `isObject(value)` — `value is Record<string, unknown>`
- `isNonNullObject(value)` — `value is Record<string, unknown>`
- `isNull(value)` — `value is null`
- `isUndefined(value)` — `value is undefined`
- `isString(value)` — `value is string`
- `isNumber(value)` — `value is number`
- `isBoolean(value)` — `value is boolean`
- `isFunction(value)` — `value is (...args: never[]) => unknown`
- `isArray<T = unknown>(value)` — `value is T[]`
- `isNonEmptyArray<T = unknown>(value)` — `value is [T, ...T[]]`
- `isEmptyArray(value: unknown[])` — `value is []`
- `isInArray<T>(array: readonly T[], value)` — `value is T`
- `hasKey<K extends PropertyKey>(key: K, value)` — `value is Record<K, unknown>`
- `isApiErrorResponse(value)` — `value is ApiErrorResponse`
- `assertDefined<T>(value, message?)` — `asserts value is NonNullable<T>`

## Development

```bash
bun install
bun run lint        # biome
bun run typecheck   # tsc --noEmit
bun run test        # bun test
bun run build       # tsup → dist (cjs + esm + dts)
```

Releasing uses [changesets](https://github.com/changesets/changesets): run
`bun run changeset`, commit the generated file, and the `Release` workflow
creates a version PR; merging it publishes to npm.

## License

MIT
