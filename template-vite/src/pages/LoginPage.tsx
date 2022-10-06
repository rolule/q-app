import {
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { SmartForm } from 'components';

const defaultValues = {
  user: '',
  password: '',
};

type LoginFormValues = typeof defaultValues;

export const LoginPage: FunctionComponent = () => {
  const form = useForm({ defaultValues });
  const toast = useToast();

  const onValid: SubmitHandler<LoginFormValues> = ({ user }) =>
    toast({
      title: `Logged in with ${user}`,
      status: 'success',
    });

  const onInvalid: SubmitErrorHandler<LoginFormValues> = ({ user, password }) =>
    toast({
      title: `Error: ${(user || password)?.message ?? 'Unknown'}`,
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

      <SmartForm
        form={form}
        spacing={2}
        onValid={onValid}
        onInvalid={onInvalid}
      >
        <Controller
          control={form.control}
          render={({ field }) => (
            <FormControl isInvalid={!!form.formState.errors.user}>
              <Input placeholder="Username" {...field} />
            </FormControl>
          )}
          name="user"
          rules={{
            required: {
              value: true,
              message: 'The username is required',
            },
            minLength: {
              value: 5,
              message: 'The username has to be 5 characters long',
            },
          }}
        />

        <Controller
          control={form.control}
          render={({ field }) => (
            <FormControl isInvalid={!!form.formState.errors.password}>
              <Input type="password" placeholder="Password" {...field} />
            </FormControl>
          )}
          name="password"
          rules={{
            required: {
              value: true,
              message: 'The password is required',
            },
            minLength: {
              value: 8,
              message: 'The password has to be 8 characters long',
            },
          }}
        />

        <Button type="submit">Submit</Button>
      </SmartForm>
    </Stack>
  );
};
