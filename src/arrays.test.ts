/**
 * Unit tests for the array guards. `isArray`/`isNonEmptyArray` narrow `unknown` values at trust
 * boundaries, so the null/non-array edge cases matter; `isEmptyArray` is the empty-tuple check.
 */
import { describe, expect, test } from 'bun:test';
import { isArray, isEmptyArray, isNonEmptyArray } from './index';

describe('isArray', () => {
  test('narrows arrays only', () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2])).toBe(true);
  });

  test('rejects non-arrays', () => {
    expect(isArray(null)).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray('x')).toBe(false);
    expect(isArray(undefined)).toBe(false);
  });
});

describe('isNonEmptyArray', () => {
  test('accepts arrays with at least one element', () => {
    expect(isNonEmptyArray([1])).toBe(true);
    expect(isNonEmptyArray(['a', 'b'])).toBe(true);
  });

  test('rejects empty arrays and non-arrays', () => {
    expect(isNonEmptyArray([])).toBe(false);
    expect(isNonEmptyArray(null)).toBe(false);
    expect(isNonEmptyArray({ length: 1 })).toBe(false);
  });
});

describe('isEmptyArray', () => {
  test('true for empty arrays', () => {
    expect(isEmptyArray([])).toBe(true);
  });

  test('false for non-empty arrays', () => {
    expect(isEmptyArray([0])).toBe(false);
    expect(isEmptyArray([undefined])).toBe(false);
  });
});
