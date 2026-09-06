import { z } from 'zod'
import { yesNoNaSchema } from './sharedEnums'

export const purposeOfProcessingSchema = z.object({
  purposeOfProcessing: z
    .string()
    .min(1, 'Please describe the purpose of processing')
    .max(2000, 'Must be under 2000 characters'),

  isPurposeDocumented: yesNoNaSchema,

  consequencesOfNotCollecting: z
    .string()
    .min(1, 'Please describe what would happen if the data is not collected')
    .max(2000, 'Must be under 2000 characters'),
})

export type PurposeOfProcessingValues = z.infer<typeof purposeOfProcessingSchema>
export const purposeOfProcessingFieldNames = purposeOfProcessingSchema.keyof().options