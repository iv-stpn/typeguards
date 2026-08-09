/**
 * Unit tests for the `Brand` type and `brandGuard` factory. `brandGuard` must behave exactly
 * like its base guard while the narrowed type carries the brand; assignability is exercised in
 * type-narrowing.test.ts.
 */
import { describe, expect, test } from 'bun:test';
import { brandGuard, isArrayOf, isNumber, isString } from './index';

describe('brandGuard', () => {
  test('behaves like the base guard', () => {
    const isUserId = brandGuard(isString, 'UserId');
    expect(isUserId('u_123')).toBe(true);
    expect(isUserId('')).toBe(true);
    expect(isUserId(42)).toBe(false);
    expect(isUserId(null)).toBe(false);
  });

  test('narrows like the base guard', () => {
    const isId = brandGuard(isNumber, 'Id');
    const value: unknown = 7;
    if (isId(value)) expect(value).toBeTypeOf('number');
  });

  test('composes with composite guards', () => {
    const isUserId = brandGuard(isString, 'UserId');
    const ids: unknown = ['u_1', 'u_2'];
    expect(isArrayOf(ids, isUserId)).toBe(true);
    const mixed: unknown = ['u_1', 2];
    expect(isArrayOf(mixed, isUserId)).toBe(false);
  });
});
