/**
 * Unit tests for the isArrayOf composite guard. It narrows `unknown` to an array whose elements all
 * pass the item guard, so empty arrays, sparse arrays, and non-array values are the edge cases.
 */
import { describe, expect, test } from 'bun:test';
import { isArrayOf, isNumber, isString } from './index';

describe('isArrayOf', () => {
  test('accepts arrays where every element passes the item guard', () => {
    expect(isArrayOf([1, 2, 3], isNumber)).toBe(true);
    expect(isArrayOf(['a', 'b'], isString)).toBe(true);
  });

  test('rejects arrays with any element failing the item guard', () => {
    expect(isArrayOf([1, 'two', 3], isNumber)).toBe(false);
    expect(isArrayOf(['a', 2], isString)).toBe(false);
  });

  test('accepts empty arrays', () => {
    expect(isArrayOf([], isNumber)).toBe(true);
  });

  test('rejects non-arrays and nullish values', () => {
    expect(isArrayOf(null, isNumber)).toBe(false);
    expect(isArrayOf(undefined, isNumber)).toBe(false);
    expect(isArrayOf({ 0: 1 }, isNumber)).toBe(false);
    expect(isArrayOf('123', isString)).toBe(false);
    expect(isArrayOf(42, isNumber)).toBe(false);
  });

  test('rejects sparse arrays (holes are treated as failures)', () => {
    const sparse = [1, 2, 3];
    sparse.length = 5;
    expect(isArrayOf(sparse, isNumber)).toBe(false);
  });

  test('handles nested arrays', () => {
    const isNumberArray = (item: unknown): item is number[] => isArrayOf(item, isNumber);
    expect(isArrayOf([[1], [2]], isNumberArray)).toBe(true);
    expect(isArrayOf([[], []], isNumberArray)).toBe(true);
    expect(isArrayOf([[1], 'nope'], isNumberArray)).toBe(false);
  });

  test('narrows to T[] inside the guard', () => {
    const value: unknown = [1, 2];
    if (isArrayOf(value, isNumber)) {
      const narrowed: number[] = value;
      expect(narrowed).toEqual([1, 2]);
    }
  });
});
