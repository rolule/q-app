import { FieldErrors, FieldValues } from 'react-hook-form';

/**
 * Accepts an object of FieldErrors and determines the first error
 * @param errors object of FieldErrors, given by onInvalid handler of react-hook-form
 * @returns the first error found or undefined if no errors exist
 */
export const getFirstError = <TFieldValues extends FieldValues>(
  errors: FieldErrors<TFieldValues>,
) => {
  const firstKey = Object.keys(errors)
    .filter((key) => !!errors[key])
    .at(0);

  if (!firstKey) return undefined;

  return errors[firstKey];
};
