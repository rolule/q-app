import { Button, Stack, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type {
  SubmitErrorHandlerEventless,
  SubmitHandlerEventless,
} from 'components';
import { SmartForm, FormInput } from 'components';
import type { LoginParams } from 'hooks/mutations';
import { useLogin, useLoginSchema } from 'hooks/mutations';
import { getFirstError } from 'utils/validation';

const defaultValues: LoginParams = { email: '', password: '' };

export const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const loginSchema = useLoginSchema();
  const form = useForm({ resolver: zodResolver(loginSchema), defaultValues });

  const { t } = useTranslation('validation');
  const { isLoading, mutateAsync: login } = useLogin();

  const onValid: SubmitHandlerEventless<LoginParams> = async (loginParams) => {
    try {
      await login(loginParams);

      // show success message and navigate to start page
      toast({ title: 'Logged in', status: 'success' });
      navigate('/');
    } catch (error) {
      toast({ title: t('unkown'), status: 'error' });
    }
  };

  const onInvalid: SubmitErrorHandlerEventless<LoginParams> = (errors) => {
    toast({
      status: 'error',
      title: getFirstError(errors)?.message ?? t('unkown'),
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
      <SmartForm
        form={form}
        spacing={2}
        onValid={onValid}
        onInvalid={onInvalid}
      >
        <FormInput
          name="email"
          placeholder="E-Mail"
          autoComplete="username"
          isDisabled={isLoading}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          isDisabled={isLoading}
        />

        <Button type="submit" isLoading={isLoading}>
          Login
        </Button>
      </SmartForm>
    </Stack>
  );
};

// eslint-disable-next-line import/no-default-export
export default LoginPage;
