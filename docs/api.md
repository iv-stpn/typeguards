**typeguards v0.0.0**

***

# typeguards v0.0.0

Zero-dependency runtime type guards for TypeScript.

Narrow unknown values at trust boundaries (parsed JSON, webhook payloads, API responses) with
composable, tree-shakeable type predicates. Each guard lives in its own module and is exported
both from the package root and as a standalone subpath (`typeguards/is-string`, etc.).

## Type Aliases

### ApiErrorResponse

> **ApiErrorResponse** = `object`

Defined in: [is-api-error-response.ts:8](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/is-api-error-response.ts#L8)

Correlation id echoed from the `x-request-id` response header, so a bug report ties back to
server logs.

#### Properties

##### error

> **error**: `string`

Defined in: [is-api-error-response.ts:8](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/is-api-error-response.ts#L8)

##### code?

> `optional` **code?**: `string`

Defined in: [is-api-error-response.ts:8](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/is-api-error-response.ts#L8)

##### requestId?

> `optional` **requestId?**: `string`

Defined in: [is-api-error-response.ts:8](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/is-api-error-response.ts#L8)

## Functions

### assertDefined()

> **assertDefined**\<`T`\>(`value`, `message?`): `asserts value is NonNullable<T>`

Defined in: [assert-defined.ts:11](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/assert-defined.ts#L11)

Asserts that a value is neither `null` nor `undefined`, narrowing its type accordingly.
Throws an `Error` with the given message (or a default) when the assertion fails.

#### Type Parameters

##### T

`T`

The type of the value being asserted, typically `T | null | undefined`.

#### Parameters

##### value

`T`

The value to assert as defined.

##### message?

`string`

Optional error message used when the assertion fails.

#### Returns

`asserts value is NonNullable<T>`

Nothing — the function either returns `void` or throws.

#### Throws

When `value` is `null` or `undefined`.

***

### hasKey()

> **hasKey**\<`K`\>(`key`, `obj`): `obj is Record<K, unknown>`

Defined in: [has-key.ts:13](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/has-key.ts#L13)

Narrows a union to the member(s) that declare `key` — a type-guard replacement for the `in`
operator's discriminated-union narrowing. Returns `true` only when `key` is an own property of
`obj`. For a plain boolean presence check where no type narrowing is needed, prefer
`Object.hasOwn(obj, key)` directly.

#### Type Parameters

##### K

`K` *extends* `PropertyKey`

The property key to look up; the narrowed type is `Record<K, unknown>`.

#### Parameters

##### key

`K`

The property key whose presence is checked.

##### obj

`unknown`

The value to inspect.

#### Returns

`obj is Record<K, unknown>`

`true` when `obj` is a non-null object that has `key` as an own property; narrows
  `obj` to `Record<K, unknown>`.

***

### isApiErrorResponse()

> **isApiErrorResponse**(`value`): `value is ApiErrorResponse`

Defined in: [is-api-error-response.ts:17](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/is-api-error-response.ts#L17)

Narrows an unknown value to [ApiErrorResponse](#apierrorresponse) with a real runtime check.

#### Parameters

##### value

`unknown`

The value to check.

#### Returns

`value is ApiErrorResponse`

`true` when `value` is an object with a string `error` and, when present, string
  `code` and `requestId` fields; narrows `value` to `ApiErrorResponse`.

***

### isArrayOf()

> **isArrayOf**\<`T`\>(`value`, `itemGuard`): `value is T[]`

Defined in: [is-array-of.ts:13](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/is-array-of.ts#L13)

Narrows `unknown` to an array whose elements all pass `itemGuard` — a type-guard replacement
for `Array.prototype.every` that also rejects sparse arrays (holes are treated as failures).
Empty arrays always pass. Pairs with [isArray](#isarray) when element types matter at trust
boundaries.

#### Type Parameters

##### T

`T`

The element type that `itemGuard` narrows to.

#### Parameters

##### value

`unknown`

The value to check.

##### itemGuard

(`item`) => `item is T`

A type guard applied to every element of `value`.

#### Returns

`value is T[]`

`true` when `value` is an array and every element passes `itemGuard`; narrows `value`
  to `T[]`.

***

### isArray()

> **isArray**\<`T`\>(`value`): `value is T[]`

Defined in: [is-array.ts:9](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/is-array.ts#L9)

Narrows `unknown` to an array. A type-guard replacement for `Array.isArray` that exposes the
element type for further probing at trust boundaries (parsed JSON, webhook payloads).

#### Type Parameters

##### T

`T` = `unknown`

The element type of the resulting array. Defaults to `unknown` when not inferred.

#### Parameters

##### value

`unknown`

The value to check.

#### Returns

`value is T[]`

`true` when `value` is an array, narrowing it to `T[]`.

***

### isBoolean()

> **isBoolean**(`value`): `value is boolean`

Defined in: [is-boolean.ts:7](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/is-boolean.ts#L7)

Narrows an unknown value to a `boolean`.

#### Parameters

##### value

`unknown`

The value to check.

#### Returns

`value is boolean`

`true` when `typeof value === 'boolean'`; narrows `value` to `boolean`.

***

### isEmptyArray()

> **isEmptyArray**(`value`): `value is []`

Defined in: [is-empty-array.ts:7](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/is-empty-array.ts#L7)

Narrows `unknown[]` to the empty tuple type `[]`.

#### Parameters

##### value

`unknown`[]

The array to check.

#### Returns

`value is []`

`true` when `value` is an empty array, narrowing it to `[]`.

***

### isFunction()

> **isFunction**(`value`): `value is (args: never[]) => unknown`

Defined in: [is-function.ts:7](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/is-function.ts#L7)

Narrows `unknown` to any function value, including class constructors and callable objects.

#### Parameters

##### value

`unknown`

The value to check.

#### Returns

`value is (args: never[]) => unknown`

`true` when `typeof value === 'function'`, narrowing it to a callable signature.

***

### isInArray()

> **isInArray**\<`T`\>(`array`, `value`): `value is T`

Defined in: [is-in-array.ts:10](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/is-in-array.ts#L10)

Returns `true` when `array` contains `value`, narrowing `value` to the array's element type.
A type-guard replacement for `Array.prototype.includes` that narrows the checked value.

#### Type Parameters

##### T

`T`

The element type of `array`; `value` is narrowed to it on success.

#### Parameters

##### array

readonly `T`[]

The array to search.

##### value

`unknown`

The value to look for.

#### Returns

`value is T`

`true` when `array` contains `value` (strict equality), narrowing `value` to `T`.

***

### isNonEmptyArray()

> **isNonEmptyArray**\<`T`\>(`value`): `value is [T, ...T[]]`

Defined in: [is-non-empty-array.ts:10](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/is-non-empty-array.ts#L10)

Narrows `unknown` to a non-empty array. Useful after `isArray` when downstream code assumes at
least one element (e.g. indexing `[0]`) and wants the compiler to enforce that assumption.

#### Type Parameters

##### T

`T` = `unknown`

The element type of the resulting non-empty tuple. Defaults to `unknown`.

#### Parameters

##### value

`unknown`

The value to check.

#### Returns

`value is [T, ...T[]]`

`true` when `value` is an array with at least one element; narrows `value` to
  `[T, ...T[]]`.

***

### isNonNullObject()

> **isNonNullObject**(`value`): `value is Record<string, unknown>`

Defined in: [is-non-null-object.ts:8](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/is-non-null-object.ts#L8)

Narrows `unknown` to any non-null `object` (arrays included), exposing string-keyed properties
for probing. Mirrors `typeof value === 'object' && value !== null`.

#### Parameters

##### value

`unknown`

The value to check.

#### Returns

`value is Record<string, unknown>`

`true` when `value` is a non-null object, narrowing it to `Record<string, unknown>`.

***

### isNull()

> **isNull**(`value`): `value is null`

Defined in: [is-null.ts:7](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/is-null.ts#L7)

Narrows an unknown value to `null`.

#### Parameters

##### value

`unknown`

The value to check.

#### Returns

`value is null`

`true` when `value === null`; narrows `value` to `null`.

***

### isNumber()

> **isNumber**(`value`): `value is number`

Defined in: [is-number.ts:7](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/is-number.ts#L7)

Narrows an unknown value to a `number`, excluding `NaN`.

#### Parameters

##### value

`unknown`

The value to check.

#### Returns

`value is number`

`true` when `typeof value === 'number'` and `value` is not `NaN`; narrows `value` to `number`.

***

### isObjectOf()

> **isObjectOf**\<`T`\>(`value`, `shape`): `value is T`

Defined in: [is-object-of.ts:17](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/is-object-of.ts#L17)

Narrows `unknown` to an object whose own properties each pass the corresponding guard in
`shape` — a declarative per-key schema check for trust boundaries. Extra keys are allowed;
missing keys, arrays, and non-objects are rejected. An empty shape matches any non-null,
non-array object.

#### Type Parameters

##### T

`T` *extends* `Record`\<`string`, `unknown`\>

The object type described by `shape`; each key maps to the type its guard
  narrows to.

#### Parameters

##### value

`unknown`

The value to check.

##### shape

\{ \[K in string \| number \| symbol\]: (item: unknown) =\> item is T\[K\] \}

A per-key schema of type guards; every key in `shape` must be an own property of
  `value` and pass its guard.

#### Returns

`value is T`

`true` when `value` is a non-null, non-array object whose own properties satisfy every
  guard in `shape`; narrows `value` to `T`.

***

### isObject()

> **isObject**(`value`): `value is Record<string, unknown>`

Defined in: [is-object.ts:9](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/is-object.ts#L9)

Narrows `unknown` to a non-null, non-array object. Excludes arrays, so use it when you
specifically don't want array values.

#### Parameters

##### value

`unknown`

The value to check.

#### Returns

`value is Record<string, unknown>`

`true` when `value` is an object that is neither `null` nor an array; narrows `value`
  to `Record<string, unknown>`.

***

### isString()

> **isString**(`value`): `value is string`

Defined in: [is-string.ts:7](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/is-string.ts#L7)

Narrows an unknown value to a `string`.

#### Parameters

##### value

`unknown`

The value to check.

#### Returns

`value is string`

`true` when `typeof value === 'string'`; narrows `value` to `string`.

***

### isUndefined()

> **isUndefined**(`value`): `value is undefined`

Defined in: [is-undefined.ts:7](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/is-undefined.ts#L7)

Narrows an unknown value to `undefined`.

#### Parameters

##### value

`unknown`

The value to check.

#### Returns

`value is undefined`

`true` when `value === undefined`; narrows `value` to `undefined`.

***

### isUnionOf()

> **isUnionOf**\<`T`\>(`value`, ...`guards`): `value is T[number]`

Defined in: [is-union-of.ts:12](https://github.com/iv-stpn/typeguards/blob/515aa7fce5e9b5bdfd8d5589ef26a6948d3b4f1d/src/is-union-of.ts#L12)

Narrows `unknown` to the union of the types guarded by `guards` — true when at least one guard
passes (first match wins). Each guard narrows independently, so the result type is their union.
An empty guard list never matches.

#### Type Parameters

##### T

`T` *extends* readonly `unknown`[]

A tuple of the types narrowed by each guard; the result type is `T[number]`.

#### Parameters

##### value

`unknown`

The value to check.

##### guards

...\{ \[K in string \| number \| symbol\]: (item: unknown) =\> item is T\[K\] \}

One or more type guards; the value passes when any guard passes.

#### Returns

`value is T[number]`

`true` when at least one guard in `guards` passes for `value`; narrows `value` to the
  union of the guards' types.
