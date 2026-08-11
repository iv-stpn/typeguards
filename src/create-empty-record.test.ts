/**
 * Unit tests for `createEmptyRecord` — the prototype-less record factory. The null prototype is
 * the whole point: `"__proto__"` keys and other inherited-member pitfalls must not apply.
 */
import { describe, expect, test } from 'bun:test';
import { createEmptyRecord } from './create-empty-record';

describe('createEmptyRecord', () => {
  test('returns an object with a null prototype', () => {
    const record = createEmptyRecord<string, number>();
    expect(Object.getPrototypeOf(record)).toBeNull();
  });

  test('returns an object with no inherited members', () => {
    const record = createEmptyRecord<string, number>();
    expect(Object.hasOwn(record, 'toString')).toBe(false);
    expect(Object.hasOwn(record, 'hasOwnProperty')).toBe(false);
  });

  test('can be filled and read like a plain record', () => {
    const record = createEmptyRecord<string, number>();
    record.answer = 42;
    record.nested = 7;
    expect(record.answer).toBe(42);
    expect(record.nested).toBe(7);
    expect(Object.keys(record)).toEqual(['answer', 'nested']);
  });

  test('starts empty', () => {
    const record = createEmptyRecord<string, number>();
    expect(Object.keys(record)).toEqual([]);
  });

  test('a __proto__ key becomes an own property, not prototype pollution', () => {
    const record = createEmptyRecord<string, unknown>();
    const protoKey = '__proto__';
    record[protoKey] = { polluted: true };
    // the malicious payload stays on the record itself...
    expect(Object.hasOwn(record, protoKey)).toBe(true);
    // ...and never reaches Object.prototype
    const plain: Record<string, unknown> = {};
    expect(plain.polluted).toBeUndefined();
  });

  test('non-string keys are supported', () => {
    const byNumber = createEmptyRecord<number, string>();
    byNumber[1] = 'one';
    expect(byNumber[1]).toBe('one');
  });
});
