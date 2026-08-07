import { isObject } from './is-object.js';
import { isString } from './is-string.js';

/** Correlation id echoed from the `x-request-id` response header, so a bug report ties back to server logs. */
export type ApiErrorResponse = { error: string; code?: string; requestId?: string };

/** Narrows an unknown value to {@link ApiErrorResponse} with a real runtime check. */
export function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  return isObject(value) && isString(value.error) && (value.code === undefined || isString(value.code));
}
