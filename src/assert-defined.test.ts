import { describe, expect, test } from 'bun:test';
import { assertDefined } from './index';

describe('assertDefined', () => {
  test('passes through defined values', () => {
    expect(assertDefined(0)).toBeUndefined();
    expect(assertDefined('')).toBeUndefined();
    expect(assertDefined(false)).toBeUndefined();
    expect(assertDefined({})).toBeUndefined();
  });

  test('throws on null and undefined', () => {
    expect(() => assertDefined(null)).toThrow('Expected value to be defined');
    expect(() => assertDefined(undefined)).toThrow('Expected value to be defined');
  });

  test('throws a custom message when provided', () => {
    expect(() => assertDefined(null, 'missing user')).toThrow('missing user');
  });
});
