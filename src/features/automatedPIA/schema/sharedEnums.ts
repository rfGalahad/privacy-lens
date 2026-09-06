import { z } from 'zod'

export const yesNoNaSchema = z.enum(['yes', 'no', 'na'], {
  required_error: 'Please select an option',
})
export type YesNoNa = z.infer<typeof yesNoNaSchema>

export const lowMediumHighNaSchema = z.enum(['low', 'medium', 'high', 'na'], {
  required_error: 'Please select an option',
})
export type LowMediumHighNa = z.infer<typeof lowMediumHighNaSchema>

export const YES_NO_NA_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: 'N/A', value: 'na' },
]

export const LOW_MEDIUM_HIGH_NA_OPTIONS = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'N/A', value: 'na' },
]