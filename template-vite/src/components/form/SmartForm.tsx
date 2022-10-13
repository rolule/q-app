import type { ComponentWithAs, StackProps } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'

import type {
  FieldErrors,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form'
import { FormProvider } from 'react-hook-form'

// required because we want to pass in mutate functions directly
// with the normal SubmitHandler, we always need create an inline functions
// because its second argument is an event and the mutation options are incompatible to it
export type SubmitHandlerEventless<T extends FieldValues> = (
  data: T,
) => ReturnType<SubmitHandler<T>>

// same as above for onInvalid
export type SubmitErrorHandlerEventless<T extends FieldValues> = (
  errors: FieldErrors<T>,
) => ReturnType<SubmitErrorHandler<T>>

type ReservedProps = 'onInvalid' | 'onSubmit'

type SmartFormProps<T extends FieldValues> = Omit<
  ComponentWithAs<'form', StackProps>,
  ReservedProps
> &
  Omit<StackProps, ReservedProps> & {
    form: Omit<UseFormReturn<T>, ReservedProps>
    onValid?: SubmitHandlerEventless<T>
    onValidEvent?: SubmitHandler<T>
    onInvalid?: SubmitErrorHandlerEventless<T>
    onInvalidEvent?: SubmitErrorHandler<T>
  }

/**
 * A form component accepting Stack props for layouting. Also provides to form instance to all children via FormProvider
 * @see https://react-hook-form.com/advanced-usage#SmartFormComponent
 * @param form The form instance
 * @param onValid A simple function that receives the valid results. This allowes passing in react-query mutation functions directly, without creating an anonymous function in between
 * @param onValidEvent A function that receives the valid results and the event
 * @param onInvalid A simple function that receives the errors object
 * @param onValidEvent A function that receives the errors object and the event
 * @returns
 */
export const SmartForm = <T extends FieldValues>({
  form,
  onValid,
  onValidEvent,
  onInvalid,
  onInvalidEvent,
  children,
  ...props
}: PropsWithChildren<SmartFormProps<T>>) => {
  const { handleSubmit } = form

  const handleValidSubmit = onValid ?? onValidEvent
  const handleInvalidSubmit = onInvalid ?? onInvalidEvent

  return (
    <Stack
      as="form"
      onSubmit={handleValidSubmit && handleSubmit(handleValidSubmit, handleInvalidSubmit)}
      {...props}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </Stack>
  )
}
