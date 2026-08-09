/**
 * Unit tests for `isInteger` — `Number.isInteger` semantics with a `typeof` gate. `-0` is an
 * integer; `NaN`, infinities, and fractional values are not.
 */
import { describe, expect, test } from 'bun:test';
import { isInteger } from './index';

describe('isInteger', () => {
  test('accepts integers', () => {
    expect(isInteger(0)).toBe(true);
    expect(isInteger(-0)).toBe(true);
    expect(isInteger(42)).toBe(true);
    expect(isInteger(-42)).toBe(true);
    expect(isInteger(1e3)).toBe(true);
  });

  test('rejects fractional and non-finite numbers', () => {
    expect(isInteger(1.5)).toBe(false);
    expect(isInteger(-0.5)).toBe(false);
    expect(isInteger(Number.NaN)).toBe(false);
    expect(isInteger(Number.POSITIVE_INFINITY)).toBe(false);
    expect(isInteger(Number.NEGATIVE_INFINITY)).toBe(false);
  });

  test('rejects non-numbers', () => {
    expect(isInteger('5')).toBe(false);
    expect(isInteger(5n)).toBe(false);
    expect(isInteger(null)).toBe(false);
    expect(isInteger(undefined)).toBe(false);
    expect(isInteger({})).toBe(false);
  });
});
