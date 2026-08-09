/**
 * Unit tests for `assert` — the throwing counterpart of the guards. It must narrow in place,
 * throw with the default or custom message, and compose with composite guards.
 */
import { describe, expect, test } from 'bun:test';
import { assert, isNumber, isObjectOf, isString } from './index';

describe('assert', () => {
  test('passes without throwing when the guard matches', () => {
    const value: unknown = 'ok';
    expect(() => assert(value, isString)).not.toThrow();
    // narrowed to string in this scope
    expect(value).toBe('ok');
  });

  test('throws the default message when the guard fails', () => {
    expect(() => assert(42, isString)).toThrow('Expected value to pass guard');
  });

  test('throws the custom message when provided', () => {
    expect(() => assert(42, isString, 'must be a string')).toThrow('must be a string');
  });

  test('composes with composite guards', () => {
    const isPoint = (value: unknown): value is { a: number } => isObjectOf(value, { a: isNumber });
    expect(() => assert({ a: 1 }, isPoint)).not.toThrow();
    expect(() => assert({ a: 'x' }, isPoint)).toThrow('Expected value to pass guard');
  });
});
