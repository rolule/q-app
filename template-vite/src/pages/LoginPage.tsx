import { Button, Heading, Stack, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';
import {
  SmartForm,
  SubmitHandlerEventless,
  SubmitErrorHandlerEventless,
  FormInput,
} from 'components';
import { getFirstError } from 'utils/validation';

const passwordMinLength = 8;

const useSchema = () => {
  const { t } = useTranslation('validation');

  return z.object({
    email: z.string().email(t('email')),
    password: z
      .string()
      .min(passwordMinLength, t('password.min', { min: passwordMinLength })),
  });
};

type LoginFormValues = z.infer<ReturnType<typeof useSchema>>;
const defaultValues: LoginFormValues = { email: '', password: '' };

export const LoginPage: FunctionComponent = () => {
  const toast = useToast();
  const formSchema = useSchema();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { t } = useTranslation('validation');

  const onValid: SubmitHandlerEventless<LoginFormValues> = ({ email }) => {
    toast({ title: `Logged in with ${email}`, status: 'success' });
  };

  const onInvalid: SubmitErrorHandlerEventless<LoginFormValues> = (errors) => {
    toast({
      title: getFirstError(errors)?.message ?? t('unkown'),
      status: 'error',
    });
  };

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
        <FormInput name="email" placeholder="E-Mail" autoComplete="username" />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
        />

        <Button type="submit">Submit</Button>
      </SmartForm>
    </Stack>
  );
};
