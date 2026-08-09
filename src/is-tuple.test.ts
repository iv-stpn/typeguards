/**
 * Unit tests for `isTuple` — fixed-length arrays where each element passes its positional guard.
 * Length mismatch, wrong element types, and non-arrays must be rejected; the narrowed tuple type
 * is exercised in type-narrowing.test.ts.
 */
import { describe, expect, test } from 'bun:test';
import { isNumber, isString, isTuple } from './index';

describe('isTuple', () => {
  test('accepts arrays matching the positional guards', () => {
    expect(isTuple([1, 'a'], isNumber, isString)).toBe(true);
    expect(isTuple(['x'], isString)).toBe(true);
    expect(isTuple([])).toBe(true);
  });

  test('rejects arrays with the wrong length', () => {
    expect(isTuple([1], isNumber, isString)).toBe(false);
    expect(isTuple([1, 'a', true], isNumber, isString)).toBe(false);
  });

  test('rejects arrays with the wrong element type at any position', () => {
    expect(isTuple(['a', 'b'], isNumber, isString)).toBe(false);
    expect(isTuple([1, 2], isNumber, isString)).toBe(false);
  });

  test('rejects non-arrays', () => {
    expect(isTuple({ 0: 1, length: 1 }, isNumber)).toBe(false);
    expect(isTuple(null, isNumber)).toBe(false);
    expect(isTuple('12', isString, isString)).toBe(false);
  });

  test('treats holes as failures for their position', () => {
    const sparse: unknown[] = new Array(3);
    sparse[0] = 1;
    sparse[2] = 'a';
    expect(isTuple(sparse, isNumber, isString, isString)).toBe(false);
  });
});
