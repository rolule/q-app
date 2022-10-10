import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';

const passwordMinLength = 8;

export const useLoginSchema = () => {
  const { t } = useTranslation('validation');

  return z.object({
    email: z.string().email(t('email')),
    password: z
      .string()
      .min(passwordMinLength, t('password.min', { min: passwordMinLength })),
  });
};

export type LoginParams = z.infer<ReturnType<typeof useLoginSchema>>;

/**
 * Loggs in the user
 * @param loginParams username and password
 * @returns mutation object for logging in
 */
const login = (_loginParams: LoginParams) =>
  new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

export const useLogin = () => useMutation(login);