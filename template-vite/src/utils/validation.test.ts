// @vitest-environment jsdom

import type { FieldError } from 'react-hook-form';
import { getFirstError } from 'utils/validation';

describe('getFirstError', () => {
  const email: FieldError = { message: 'Email error', type: 'pattern' };
  const user: FieldError = { message: 'User error', type: 'min' };

  type FormValues = { email: string; user: string };

  it('returns undefined for no errors', () => {
    expect(getFirstError({})).toBeUndefined();
    expect(getFirstError({ email: undefined })).toBeUndefined();
  });

  it('returns error when there is only one error', () => {
    expect(getFirstError<FormValues>({ email })).toBe(email);
    expect(getFirstError<FormValues>({ user: undefined, email })).toBe(email);
  });

  it('returns first error when there are multiple errors', () => {
    expect(getFirstError<FormValues>({ user, email })).toBe(user);
  });
});
