import { FormControl } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput, FormInputProps } from 'components';

// see https://emailregex.com/
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const EmailInput: FunctionComponent<FormInputProps> = ({
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
        rules={{
          pattern: {
            value: emailRegex,
            message: 'E-Mail not formatted properly',
          },
          ...rules,
        }}
        {...inputProps}
      />
    </FormControl>
  );
};
