import type { FieldErrorsImpl, FieldValues } from 'react-hook-form';

/**
 * Accepts an object of FieldErrors and determines the first error
 * @param errors object of FieldErrors, given by onInvalid handler of react-hook-form
 * @returns the first error found or undefined if no errors exist
 */
export const getFirstError = <TFieldValues extends FieldValues>(
  errors: FieldErrorsImpl<TFieldValues>,
) => {
  const firstKey = Object.keys(errors)
    .filter((key) => !!errors[key])
    .at(0);

  return firstKey ? errors[firstKey] : undefined;
};
