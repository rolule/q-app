import { Input, InputProps } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import {
  Controller,
  ControllerProps,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';

export type FormInputProps = {
  name: string;
  rules?: RegisterOptions;
} & InputProps;

export const FormInput: FunctionComponent<FormInputProps> = ({
  name,
  rules,
  ...inputProps
}) => {
  const { control } = useFormContext();

  const controllerProps: ControllerProps = {
    control,
    name,
    rules,

    render: ({ field }) => <Input {...field} {...inputProps} />,
  };

  return <Controller {...controllerProps} />;
};
