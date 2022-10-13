import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import * as z from 'zod'
import { jsonRequest } from 'utils/api'

const passwordMinLength = 8

export const useLoginSchema = () => {
  const { t } = useTranslation('validation')

  return z.object({
    email: z.string().email(t('email')),
    password: z.string().min(passwordMinLength, t('password.min', { min: passwordMinLength })),
  })
}

export type LoginParams = z.infer<ReturnType<typeof useLoginSchema>>
export type LoginResult = { token: string }

/**
 * Logs-in the user
 * @param loginParams username and password
 * @returns mutation object for logging in
 */
const login = async (loginParams: LoginParams) =>
  jsonRequest<LoginResult>(`login`, {
    method: 'post',
    body: JSON.stringify(loginParams),
  })

export const useLogin = () => useMutation(login)
