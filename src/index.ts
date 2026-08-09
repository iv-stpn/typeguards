/**
 * Zero-dependency runtime type guards for TypeScript.
 *
 * Narrow unknown values at trust boundaries (parsed JSON, webhook payloads, API responses) with
 * composable, tree-shakeable type predicates. Each guard lives in its own module and is exported
 * both from the package root and as a standalone subpath (`typeguards/is-string`, etc.).
 *
 * @module typeguards
 */
// biome-ignore-all lint/performance/noBarrelFile: intentional — this is the single public surface of the package.
export { assert } from './assert.js';
export { assertDefined } from './assert-defined.js';
export type { Brand } from './brand.js';
export { brandGuard } from './brand.js';
export { hasKey } from './has-key.js';
export type { ApiErrorResponse } from './is-api-error-response.js';
export { isApiErrorResponse } from './is-api-error-response.js';
export { isArray } from './is-array.js';
export { isArrayOf } from './is-array-of.js';
export { isBoolean } from './is-boolean.js';
export { isEmptyArray } from './is-empty-array.js';
export { isFiniteNumber } from './is-finite-number.js';
export { isFunction } from './is-function.js';
export { isInArray } from './is-in-array.js';
export { isInteger } from './is-integer.js';
export { isNonEmptyArray } from './is-non-empty-array.js';
export { isNonNullObject } from './is-non-null-object.js';
export { isNull } from './is-null.js';
export { isNumber } from './is-number.js';
export { isObject } from './is-object.js';
export { isObjectOf } from './is-object-of.js';
export { isOneOf } from './is-one-of.js';
export { isRecord } from './is-record.js';
export { isString } from './is-string.js';
export { isTuple } from './is-tuple.js';
export { isUndefined } from './is-undefined.js';
export { isUnionOf } from './is-union-of.js';
export { parse } from './parse.js';
