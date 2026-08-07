import { describe, expect, test } from 'bun:test';
import { hasKey } from './index';

describe('hasKey', () => {
  test('accepts objects with the key as an own property', () => {
    expect(hasKey('a', { a: 1 })).toBe(true);
    expect(hasKey('toString', {})).toBe(false);
  });

  test('rejects objects without the key, null, arrays and primitives', () => {
    expect(hasKey('a', {})).toBe(false);
    expect(hasKey('a', null)).toBe(false);
    expect(hasKey('a', [1, 2])).toBe(false);
    expect(hasKey('a', 'x')).toBe(false);
    expect(hasKey('a', 42)).toBe(false);
  });
});
