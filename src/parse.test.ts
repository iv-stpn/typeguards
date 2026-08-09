/**
 * Unit tests for `parse` — the returning counterpart of `assert`. It must hand back the exact
 * value narrowed to the guard's type, and throw with the default or custom message otherwise.
 */
import { describe, expect, test } from 'bun:test';
import { isNumber, isObject, isString, isTuple, parse } from './index';

describe('parse', () => {
  test('returns the narrowed value when the guard passes', () => {
    const value: unknown = 42;
    const parsed = parse(value, isNumber);
    expect(parsed).toBe(42);
  });

  test('returns the same reference (no copy)', () => {
    const object = { a: 1 };
    expect(parse(object, isObject)).toBe(object);
  });

  test('throws the default message when the guard fails', () => {
    expect(() => parse('nope', isNumber)).toThrow('Expected value to pass guard');
  });

  test('throws the custom message when provided', () => {
    expect(() => parse('nope', isNumber, 'must be a number')).toThrow('must be a number');
  });

  test('composes with composite guards', () => {
    const isPoint = (value: unknown): value is [number, string] => isTuple(value, isNumber, isString);
    const point = parse([1, 'a'], isPoint);
    expect(point[0]).toBe(1);
    expect(point[1]).toBe('a');
    expect(() => parse([1, 2], isPoint)).toThrow();
  });
});
