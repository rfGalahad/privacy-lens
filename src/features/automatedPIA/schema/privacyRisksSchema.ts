import { z } from 'zod'
import { lowMediumHighNaSchema } from './sharedEnums'

export const privacyRisksSchema = z.object({
  identifiedRisks: z
    .string()
    .min(1, 'Please identify the potential privacy risks')
    .max(2000, 'Must be under 2000 characters'),

  riskLikelihood: lowMediumHighNaSchema,
  riskImpact: lowMediumHighNaSchema,
})

export type PrivacyRisksValues = z.infer<typeof privacyRisksSchema>
export const privacyRisksFieldNames = privacyRisksSchema.keyof().options