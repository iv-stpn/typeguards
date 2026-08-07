import { describe, expect, test } from 'bun:test';
import { isInArray } from './index';

describe('isInArray', () => {
  test('narrows values present in the array', () => {
    expect(isInArray(['a', 'b'], 'a')).toBe(true);
    expect(isInArray([1, 2, 3], 2)).toBe(true);
  });

  test('rejects values absent from the array', () => {
    expect(isInArray(['a', 'b'], 'c')).toBe(false);
    expect(isInArray([1, 2, 3], 4)).toBe(false);
    expect(isInArray([], 'a')).toBe(false);
  });
});
