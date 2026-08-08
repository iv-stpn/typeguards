/**
 * Compile-time tests: these assertions only pass when the emitted declarations
 * preserve the type-predicate and assertion signatures. They guard against the
 * barrel/declaration regressions that make guards degrade to `boolean`.
 */
import { describe, expect, test } from 'bun:test';
import {
  assertDefined,
  hasKey,
  isApiErrorResponse,
  isArray,
  isArrayOf,
  isBoolean,
  isEmptyArray,
  isFunction,
  isInArray,
  isNonEmptyArray,
  isNonNullObject,
  isNull,
  isNumber,
  isObject,
  isObjectOf,
  isString,
  isUndefined,
  isUnionOf,
} from './index';

describe('type-level narrowing', () => {
  test('isObject narrows to Record<string, unknown>', () => {
    const value: unknown = { a: 1 };
    if (isObject(value)) {
      const record: Record<string, unknown> = value;
      expect(record.a).toBe(1);
    }
  });

  test('isNonNullObject narrows objects and arrays', () => {
    const value: unknown = [1];
    if (isNonNullObject(value)) {
      const record: Record<string, unknown> = value;
      expect(record[0]).toBe(1);
    }
  });

  test('primitives narrow to their literal types', () => {
    const stringValue: unknown = 'x';
    const numberValue: unknown = 1;
    const booleanValue: unknown = true;
    const nullValue: unknown = null;
    const undefinedValue: unknown = undefined;
    const functionValue: unknown = () => {};
    if (isString(stringValue)) {
      const narrowed: string = stringValue;
      expect(narrowed).toBe('x');
    }
    if (isNumber(numberValue)) {
      const narrowed: number = numberValue;
      expect(narrowed).toBe(1);
    }
    if (isBoolean(booleanValue)) {
      const narrowed: boolean = booleanValue;
      expect(narrowed).toBe(true);
    }
    if (isNull(nullValue)) {
      const narrowed: null = nullValue;
      expect(narrowed).toBeNull();
    }
    if (isUndefined(undefinedValue)) {
      const narrowed: undefined = undefinedValue;
      expect(narrowed).toBeUndefined();
    }
    if (isFunction(functionValue)) {
      const narrowed: (...args: never[]) => unknown = functionValue;
      expect(narrowed).toBeTypeOf('function');
    }
  });

  test('isArray narrows to T[]', () => {
    const value: unknown = [1, 2];
    if (isArray<number>(value)) {
      const narrowed: number[] = value;
      expect(narrowed).toHaveLength(2);
    }
  });

  test('isNonEmptyArray narrows to a tuple with a safe first element', () => {
    const value: unknown = [1];
    if (isNonEmptyArray<number>(value)) {
      const first: number = value[0];
      expect(first).toBe(1);
    }
  });

  test('isEmptyArray narrows to the empty tuple', () => {
    const value: unknown[] = [];
    if (isEmptyArray(value)) {
      const narrowed: [] = value;
      expect(narrowed).toHaveLength(0);
    }
  });

  test('isInArray narrows to the element type', () => {
    const value: unknown = 'a';
    const options = ['a', 'b'] as const;
    if (isInArray(options, value)) {
      const narrowed: 'a' | 'b' = value;
      expect(narrowed).toBe('a');
    }
  });

  test('hasKey narrows to a record carrying the key', () => {
    const value: unknown = { a: 1 };
    if (hasKey('a', value)) {
      const narrowed: Record<'a', unknown> = value;
      expect(narrowed.a).toBe(1);
    }
  });

  test('isApiErrorResponse narrows to ApiErrorResponse', () => {
    const value: unknown = { error: 'boom' };
    if (isApiErrorResponse(value)) {
      const narrowed: { error: string; code?: string; requestId?: string } = value;
      expect(narrowed.error).toBe('boom');
    }
  });

  test('assertDefined narrows away null and undefined', () => {
    const value: string | undefined = 'defined';
    assertDefined(value);
    const narrowed: string = value;
    expect(narrowed).toBe('defined');
  });
});

describe('type-level narrowing of composite guards', () => {
  test('isArrayOf narrows to T[]', () => {
    const value: unknown = [1, 2];
    if (isArrayOf(value, isNumber)) {
      const narrowed: number[] = value;
      expect(narrowed).toHaveLength(2);
    }
  });

  test('isObjectOf narrows to the shaped object type', () => {
    const value: unknown = { a: 1 };
    if (isObjectOf(value, { a: isNumber })) {
      const narrowed: { a: number } = value;
      expect(narrowed.a).toBe(1);
    }
  });

  test('isUnionOf narrows to the union of guarded types', () => {
    const value: unknown = 'x';
    if (isUnionOf(value, isString, isNumber)) {
      const narrowed: string | number = value;
      expect(narrowed).toBe('x');
    }
  });

  test('composite guards narrow exactly, not to any or unknown', () => {
    const arrayValue: unknown = [1];
    if (isArrayOf(arrayValue, isNumber)) {
      // @ts-expect-error isArrayOf<number> narrows to number[], not string[]
      const notStringArray: string[] = arrayValue;
      expect(notStringArray).toBeDefined();
    }

    const objectValue: unknown = { a: 1 };
    if (isObjectOf(objectValue, { a: isNumber })) {
      // @ts-expect-error isObjectOf narrows to { a: number }, not { a: string }
      const notStringShape: { a: string } = objectValue;
      expect(notStringShape).toBeDefined();
    }

    const unionValue: unknown = 1;
    if (isUnionOf(unionValue, isString, isNumber)) {
      // @ts-expect-error isUnionOf narrows to string | number, not boolean
      const notBoolean: boolean = unionValue;
      expect(notBoolean).toBeDefined();
    }
  });
});
