import { FormControl } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput, FormInputProps } from 'components';

export const PasswordInput: FunctionComponent<FormInputProps> = ({
  name,
  rules,
  ...inputProps
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  const isInvalid = !!errors[name];

  return (
    <FormControl isInvalid={isInvalid}>
      <FormInput
        name={name}
        type="password"
        rules={{
          required: {
            value: true,
            message: 'The password is required',
          },
          minLength: {
            value: 8,
            message: 'The password has to be 8 characters long',
          },
          ...rules,
        }}
        {...inputProps}
      />
    </FormControl>
  );
};
