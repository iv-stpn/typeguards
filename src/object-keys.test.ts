/**
 * Unit tests for `objectKeys` — the typed `Object.keys` wrapper. Runtime behaviour must match
 * `Object.keys` exactly (own enumerable string keys, insertion order, symbols excluded); the
 * difference is purely at the type level, which type-narrowing.test.ts covers.
 */
import { describe, expect, test } from 'bun:test';
import { objectKeys } from './object-keys';

describe('objectKeys', () => {
  test('returns the own enumerable string keys of a plain object', () => {
    expect(objectKeys({ a: 1, b: 2 })).toEqual(['a', 'b']);
  });

  test('returns an empty array for an empty object', () => {
    expect(objectKeys({})).toEqual([]);
  });

  test('works on class instances', () => {
    class Point {
      x = 0;
      y = 0;
    }
    expect(objectKeys(new Point())).toEqual(['x', 'y']);
  });

  test('excludes inherited and non-enumerable keys', () => {
    const proto = { inherited: true };
    const own = Object.create(proto);
    own.ownKey = 1;
    Object.defineProperty(own, 'hidden', { value: 2, enumerable: false });
    expect(objectKeys(own)).toEqual(['ownKey']);
  });

  test('excludes symbol keys', () => {
    const symbolKey = Symbol('s');
    const obj = { visible: 1, [symbolKey]: 2 };
    expect(objectKeys(obj)).toEqual(['visible']);
  });

  test('preserves insertion order', () => {
    expect(objectKeys({ z: 1, a: 2, m: 3 })).toEqual(['z', 'a', 'm']);
  });
});
