import { Button, Stack, useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FunctionComponent } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import type {
  SubmitErrorHandlerEventless,
  SubmitHandlerEventless,
} from 'components'
import { SmartForm, FormInput } from 'components'
import type { LoginParams } from 'hooks/mutations'
import { useLogin, useLoginSchema } from 'hooks/mutations'
import { getFirstError } from 'utils/validation'

const defaultValues: LoginParams = { email: '', password: '' }

export const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const loginSchema = useLoginSchema()
  const form = useForm({ resolver: zodResolver(loginSchema), defaultValues })

  const { t } = useTranslation('validation')
  const { isLoading, mutateAsync: login } = useLogin()

  const handleValidSubmit: SubmitHandlerEventless<LoginParams> = async (
    loginParams,
  ) => {
    try {
      await login(loginParams)

      // show success message and navigate to start page
      toast({ title: 'Logged in', status: 'success' })
      navigate('/')
    } catch (error) {
      toast({ title: t('unkown'), status: 'error' })
    }
  }

  const handleInvalidSubmit: SubmitErrorHandlerEventless<LoginParams> = (
    errors,
  ) => {
    toast({
      status: 'error',
      title: getFirstError(errors)?.message ?? t('unkown'),
    })
  }

  return (
    <Stack
      align="center"
      bgColor="cyan"
      borderRadius={10}
      padding={5}
      spacing={5}
    >
      <SmartForm
        form={form}
        spacing={2}
        onInvalid={handleInvalidSubmit}
        onValid={handleValidSubmit}
      >
        <FormInput
          autoComplete="username"
          isDisabled={isLoading}
          name="email"
          placeholder="E-Mail"
        />

        <FormInput
          autoComplete="current-password"
          isDisabled={isLoading}
          name="password"
          placeholder="Password"
          type="password"
        />

        <Button isLoading={isLoading} type="submit">
          Login
        </Button>
      </SmartForm>
    </Stack>
  )
}

// eslint-disable-next-line import/no-default-export
export default LoginPage
