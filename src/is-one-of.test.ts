/**
 * Unit tests for `isOneOf` — strict-equality membership against a literal option list. Empty
 * options never match; the narrowed type is exercised in type-narrowing.test.ts.
 */
import { describe, expect, test } from 'bun:test';
import { isInArray, isOneOf } from './index';

describe('isOneOf', () => {
  test('accepts values equal to an option', () => {
    expect(isOneOf('GET', 'GET', 'POST', 'PUT', 'DELETE')).toBe(true);
    expect(isOneOf('POST', 'GET', 'POST')).toBe(true);
    expect(isOneOf(2, 1, 2, 3)).toBe(true);
  });

  test('rejects values not in the option list', () => {
    expect(isOneOf('PATCH', 'GET', 'POST')).toBe(false);
    expect(isOneOf('GET', 'get')).toBe(false);
    expect(isOneOf(4, 1, 2, 3)).toBe(false);
  });

  test('empty options never match', () => {
    expect(isOneOf('anything')).toBe(false);
    expect(isOneOf(undefined)).toBe(false);
  });

  test('uses strict equality', () => {
    expect(isOneOf(1, '1')).toBe(false);
    expect(isOneOf(null, null)).toBe(true);
    expect(isOneOf(undefined, undefined)).toBe(true);
  });

  test('agrees with isInArray on the same options', () => {
    const options = ['a', 'b', 'c'] as const;
    const value: unknown = 'b';
    expect(isOneOf(value, 'a', 'b', 'c')).toBe(isInArray(options, value));
  });
});
