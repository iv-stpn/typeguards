/**
 * Unit tests for the isObjectOf composite guard. It checks that an object's own properties match a
 * per-key shape, so missing keys, inherited keys, arrays, and non-objects are the edge cases.
 */
import { describe, expect, test } from 'bun:test';
import { isBoolean, isNumber, isObjectOf, isString } from './index';

describe('isObjectOf', () => {
  test('accepts objects matching the full shape', () => {
    expect(isObjectOf({ a: 1, b: 'x' }, { a: isNumber, b: isString })).toBe(true);
  });

  test('allows extra keys not present in the shape', () => {
    expect(isObjectOf({ a: 1, extra: true }, { a: isNumber })).toBe(true);
  });

  test('accepts any non-null, non-array object for an empty shape', () => {
    expect(isObjectOf({}, {})).toBe(true);
    expect(isObjectOf({ anything: 'goes' }, {})).toBe(true);
  });

  test('rejects objects with missing keys', () => {
    expect(isObjectOf({}, { a: isNumber })).toBe(false);
    expect(isObjectOf({ b: 1 }, { a: isNumber, b: isNumber })).toBe(false);
  });

  test('rejects values failing their key guard', () => {
    expect(isObjectOf({ a: 'not a number' }, { a: isNumber })).toBe(false);
    expect(isObjectOf({ a: 1, b: 2 }, { a: isNumber, b: isBoolean })).toBe(false);
  });

  test('rejects arrays, null, and primitives', () => {
    expect(isObjectOf([1], { 0: isNumber })).toBe(false);
    expect(isObjectOf(null, {})).toBe(false);
    expect(isObjectOf(undefined, {})).toBe(false);
    expect(isObjectOf('x', {})).toBe(false);
    expect(isObjectOf(42, {})).toBe(false);
  });

  test('requires own properties (inherited keys do not count)', () => {
    const inherited = Object.create({ a: 1 });
    expect(isObjectOf(inherited, { a: isNumber })).toBe(false);
  });

  test('handles nested objects', () => {
    const shape = { user: (v: unknown): v is { name: string } => isObjectOf(v, { name: isString }) };
    expect(isObjectOf({ user: { name: 'ada' } }, shape)).toBe(true);
    expect(isObjectOf({ user: { name: 42 } }, shape)).toBe(false);
    expect(isObjectOf({ user: null }, shape)).toBe(false);
  });

  test('narrows to the shaped object type inside the guard', () => {
    const value: unknown = { a: 1 };
    if (isObjectOf(value, { a: isNumber })) {
      const narrowed: { a: number } = value;
      expect(narrowed.a).toBe(1);
    }
  });
});
