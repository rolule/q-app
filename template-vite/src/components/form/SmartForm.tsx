import { ComponentWithAs, Stack, StackProps } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import {
  FieldErrors,
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

// required because we want to pass in mutate functions directly
// with the normal SubmitHandler, we always need create an inline functions
// because its second argument is an event and the mutation options are incompatible to it
export type SubmitHandlerEventless<T> = (data: T) => unknown | Promise<unknown>;

// same as above for onInvalid
export type SubmitErrorHandlerEventless<T extends FieldValues> = (
  errors: FieldErrors<T>,
) => unknown | Promise<unknown>;

type ReservedProps = 'onSubmit' | 'onInvalid';

type SmartFormProps<T extends FieldValues> = {
  form: Omit<UseFormReturn<T>, ReservedProps>;
  onValid?: SubmitHandlerEventless<T>;
  onValidEvent?: SubmitHandler<T>;
  onInvalid?: SubmitErrorHandlerEventless<T>;
  onInvalidEvent?: SubmitErrorHandler<T>;
} & Omit<ComponentWithAs<'form', StackProps>, ReservedProps> &
  Omit<StackProps, ReservedProps>;

export const SmartForm = <T extends FieldValues>({
  form,
  onValid,
  onValidEvent,
  onInvalid,
  onInvalidEvent,
  children,
  ...props
}: PropsWithChildren<SmartFormProps<T>>) => {
  const { handleSubmit } = form;

  const onSubmitValid = onValid || onValidEvent;
  const onSubmitInvalid = onInvalid || onInvalidEvent;

  return (
    <Stack
      as="form"
      onSubmit={onSubmitValid && handleSubmit(onSubmitValid, onSubmitInvalid)}
      {...props}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </Stack>
  );
};
