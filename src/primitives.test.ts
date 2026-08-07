/**
 * Unit tests for the primitive + object type guards. These narrow `unknown` values at trust
 * boundaries (parsed JSON, webhook payloads), so the edge cases (null, arrays, NaN) matter.
 */
import { describe, expect, test } from 'bun:test';
import { isBoolean, isFunction, isNonNullObject, isNull, isNumber, isObject, isString, isUndefined } from './index';

describe('isObject', () => {
  test('accepts plain objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
  });

  test('rejects null, arrays, and primitives', () => {
    expect(isObject(null)).toBe(false);
    expect(isObject([1, 2])).toBe(false);
    expect(isObject('x')).toBe(false);
    expect(isObject(42)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });
});

describe('isNonNullObject', () => {
  test('accepts objects and arrays', () => {
    expect(isNonNullObject({})).toBe(true);
    expect(isNonNullObject([1])).toBe(true);
  });

  test('rejects null and primitives', () => {
    expect(isNonNullObject(null)).toBe(false);
    expect(isNonNullObject('x')).toBe(false);
  });
});

describe('isString', () => {
  test('narrows strings only', () => {
    expect(isString('')).toBe(true);
    expect(isString('x')).toBe(true);
    expect(isString(1)).toBe(false);
    expect(isString(null)).toBe(false);
  });
});

describe('isNumber', () => {
  test('accepts finite numbers', () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-3.5)).toBe(true);
  });

  test('rejects NaN and non-numbers', () => {
    expect(isNumber(Number.NaN)).toBe(false);
    expect(isNumber('1')).toBe(false);
    expect(isNumber(null)).toBe(false);
  });
});

describe('isBoolean', () => {
  test('narrows booleans only', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean('true')).toBe(false);
  });
});

describe('isNull', () => {
  test('narrows null only', () => {
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(false);
    expect(isNull(0)).toBe(false);
    expect(isNull({})).toBe(false);
  });
});

describe('isUndefined', () => {
  test('narrows undefined only', () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined('')).toBe(false);
  });
});

describe('isFunction', () => {
  test('narrows functions only', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(Array.isArray)).toBe(true);
    expect(isFunction(class Foo {})).toBe(true);
    expect(isFunction({})).toBe(false);
    expect(isFunction('fn')).toBe(false);
    expect(isFunction(null)).toBe(false);
  });
});
