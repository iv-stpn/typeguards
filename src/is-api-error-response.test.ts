import { describe, expect, test } from 'bun:test';
import { isApiErrorResponse } from './index';

describe('isApiErrorResponse', () => {
  test('accepts a minimal error response', () => {
    expect(isApiErrorResponse({ error: 'boom' })).toBe(true);
  });

  test('accepts an error response with optional fields', () => {
    expect(isApiErrorResponse({ error: 'boom', code: 'E123', requestId: 'req-1' })).toBe(true);
    expect(isApiErrorResponse({ error: 'boom', code: 'E123' })).toBe(true);
  });

  test('rejects non-objects and malformed shapes', () => {
    expect(isApiErrorResponse(null)).toBe(false);
    expect(isApiErrorResponse('boom')).toBe(false);
    expect(isApiErrorResponse({})).toBe(false);
    expect(isApiErrorResponse({ error: 42 })).toBe(false);
    expect(isApiErrorResponse({ error: 'boom', code: 42 })).toBe(false);
    expect(isApiErrorResponse({ error: 'boom', requestId: 42 })).toBe(false);
  });
});
