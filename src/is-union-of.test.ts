/**
 * Unit tests for the isUnionOf composite guard. It accepts a value when at least one guard passes
 * and short-circuits on the first match, so the empty guard list and overlapping guards are the
 * edge cases.
 */
import { describe, expect, test } from 'bun:test';
import { isNumber, isObjectOf, isString, isUnionOf } from './index';

describe('isUnionOf', () => {
  test('accepts values matching any guard', () => {
    expect(isUnionOf('x', isString, isNumber)).toBe(true);
    expect(isUnionOf(42, isString, isNumber)).toBe(true);
  });

  test('rejects values matching no guard', () => {
    expect(isUnionOf(true, isString, isNumber)).toBe(false);
    expect(isUnionOf({}, isString, isNumber)).toBe(false);
  });

  test('never matches an empty guard list', () => {
    expect(isUnionOf('x')).toBe(false);
    expect(isUnionOf(null)).toBe(false);
  });

  test('rejects null and undefined unless a guard accepts them', () => {
    expect(isUnionOf(null, isString, isNumber)).toBe(false);
    expect(isUnionOf(undefined, isString, isNumber)).toBe(false);
  });

  test('stops at the first matching guard', () => {
    const calls: string[] = [];
    const first = (v: unknown): v is string => {
      calls.push('first');
      return true;
    };
    const second = (v: unknown): v is number => {
      calls.push('second');
      return true;
    };
    expect(isUnionOf('anything', first, second)).toBe(true);
    expect(calls).toEqual(['first']);
  });

  test('handles nested composite guards', () => {
    const isUser = (v: unknown): v is { name: string } => isObjectOf(v, { name: isString });
    expect(isUnionOf({ name: 'ada' }, isString, isUser)).toBe(true);
    expect(isUnionOf({ name: 42 }, isString, isUser)).toBe(false);
  });

  test('narrows to the union of guard results', () => {
    const value: unknown = 'x';
    if (isUnionOf(value, isString, isNumber)) {
      const narrowed: string | number = value;
      expect(narrowed).toBe('x');
    }
  });
});
