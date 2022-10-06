import { Button, Heading, Stack, useToast } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { EmailInput, SmartForm, PasswordInput } from 'components';

const defaultValues = {
  email: '',
  password: '',
};

type LoginFormValues = typeof defaultValues;

export const LoginPage: FunctionComponent = () => {
  const form = useForm({ defaultValues });
  const toast = useToast();

  const onValid: SubmitHandler<LoginFormValues> = ({ email }) =>
    toast({
      title: `Logged in with ${email}`,
      status: 'success',
    });

  const onInvalid: SubmitErrorHandler<LoginFormValues> = ({
    email,
    password,
  }) =>
    toast({
      title: `Error: ${(email || password)?.message ?? 'Unknown'}`,
      status: 'error',
    });

  return (
    <Stack
      spacing={5}
      bgColor="cyan"
      padding={5}
      borderRadius={10}
      align="center"
    >
      <Heading>Login</Heading>

      <SmartForm form={form} spacing={2} {...{ onValid, onInvalid }}>
        <EmailInput
          name="email"
          rules={{ required: { value: true, message: 'Email is required' } }}
          placeholder="E-Mail"
        />

        <PasswordInput name="password" placeholder="Password" />

        <Button type="submit">Submit</Button>
      </SmartForm>
    </Stack>
  );
};
