import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { Controller, ControllerProps, useFormContext } from 'react-hook-form';

export type FormInputProps = {
  name: string;
  showError?: boolean;
  controlProps?: FormControlProps;
} & InputProps;

/**
 * A smart form Input, that automatically registers itself to a parent SmartForm under the given name
 * @param name the name of the form input
 * @param showError enables showing the error message when the input is invalid
 * @param controlProps allows passing additional parameters to the FormControl element
 */
export const FormInput: FunctionComponent<FormInputProps> = ({
  name,
  showError = false,
  controlProps,
  ...inputProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string;

  const controllerProps: ControllerProps = {
    control,
    name,

    render: ({ field }) => (
      <FormControl isInvalid={!!errors[name]} {...controlProps}>
        <Input {...field} {...inputProps} />

        {showError && errorMessage && (
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        )}
      </FormControl>
    ),
  };

  return <Controller {...controllerProps} />;
};
