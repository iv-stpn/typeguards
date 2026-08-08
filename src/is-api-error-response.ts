import { isObject } from './is-object.js';
import { isString } from './is-string.js';

/**
 * Correlation id echoed from the `x-request-id` response header, so a bug report ties back to
 * server logs.
 */
export type ApiErrorResponse = { error: string; code?: string; requestId?: string };

/**
 * Narrows an unknown value to {@link ApiErrorResponse} with a real runtime check.
 *
 * @param value - The value to check.
 * @returns `true` when `value` is an object with a string `error` and, when present, string
 *   `code` and `requestId` fields; narrows `value` to `ApiErrorResponse`.
 */
export function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  return (
    isObject(value) &&
    isString(value.error) &&
    (value.code === undefined || isString(value.code)) &&
    (value.requestId === undefined || isString(value.requestId))
  );
}
