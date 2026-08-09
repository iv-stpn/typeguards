/**
 * Unit tests for `isRecord` — the plain-object check. Class instances, built-ins (`Date`,
 * `Map`), arrays, and null-prototype-free exotic objects must be rejected; `Object.create(null)`
 * objects must pass.
 */
import { describe, expect, test } from 'bun:test';
import { isRecord } from './index';

describe('isRecord', () => {
  test('accepts plain objects', () => {
    expect(isRecord({})).toBe(true);
    expect(isRecord({ a: 1 })).toBe(true);
    expect(isRecord(Object.create(null))).toBe(true);
    expect(isRecord(JSON.parse('{"a":1}'))).toBe(true);
  });

  test('rejects arrays and non-objects', () => {
    expect(isRecord([])).toBe(false);
    expect(isRecord(null)).toBe(false);
    expect(isRecord(undefined)).toBe(false);
    expect(isRecord('x')).toBe(false);
    expect(isRecord(42)).toBe(false);
    expect(isRecord(true)).toBe(false);
  });

  test('rejects objects with a custom prototype', () => {
    expect(isRecord(new Date())).toBe(false);
    expect(isRecord(new Map())).toBe(false);
    expect(isRecord(new Set())).toBe(false);
    expect(isRecord(new Uint8Array(0))).toBe(false);
    expect(isRecord(Object.create({}))).toBe(false);
  });

  test('rejects class instances', () => {
    class Point {
      x = 0;
      y = 0;
    }
    expect(isRecord(new Point())).toBe(false);
  });

  test('rejects functions', () => {
    expect(isRecord(() => undefined)).toBe(false);
    expect(isRecord(Array.isArray)).toBe(false);
  });
});
