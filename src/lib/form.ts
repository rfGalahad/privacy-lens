import { createFormHookContexts, createFormHook } from '@tanstack/react-form'

import ComboBox from '@/components/ui/ComboBox'
import TextField from '@/components/ui/TextField'
import RadioGroup from '@/components/ui/RadioGroup'
import CheckboxGroup from '@/components/ui/CheckboxGroup'

export const {
  fieldContext,
  formContext,
  useFieldContext,
  useFormContext
} = createFormHookContexts()

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    ComboBox,
    RadioGroup,
    CheckboxGroup,
  },
  formComponents: {},
})