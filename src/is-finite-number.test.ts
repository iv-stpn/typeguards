/**
 * Unit tests for `isFiniteNumber` — finite numbers only; `NaN` and `±Infinity` must be rejected
 * even though `typeof` reports them as numbers.
 */
import { describe, expect, test } from 'bun:test';
import { isFiniteNumber } from './index';

describe('isFiniteNumber', () => {
  test('accepts finite numbers', () => {
    expect(isFiniteNumber(0)).toBe(true);
    expect(isFiniteNumber(-0)).toBe(true);
    expect(isFiniteNumber(42.5)).toBe(true);
    expect(isFiniteNumber(-1e10)).toBe(true);
  });

  test('rejects NaN and infinities', () => {
    expect(isFiniteNumber(Number.NaN)).toBe(false);
    expect(isFiniteNumber(Number.POSITIVE_INFINITY)).toBe(false);
    expect(isFiniteNumber(Number.NEGATIVE_INFINITY)).toBe(false);
  });

  test('rejects non-numbers', () => {
    expect(isFiniteNumber('5')).toBe(false);
    expect(isFiniteNumber(5n)).toBe(false);
    expect(isFiniteNumber(null)).toBe(false);
    expect(isFiniteNumber(undefined)).toBe(false);
  });
});
