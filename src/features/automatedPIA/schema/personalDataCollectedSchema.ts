import { z } from 'zod'
import { yesNoNaSchema } from './sharedEnums'

export const personalDataCollectedSchema = z.object({
  dataCategories: z
    .array(z.enum(['basic', 'sensitive', 'na']))
    .min(1, 'Please select at least one category'),

  specificDataElements: z
    .string()
    .min(1, 'Please list the specific data elements collected')
    .max(2000, 'Must be under 2000 characters'),

  minorsDataInvolved: yesNoNaSchema,
})

export type PersonalDataCollectedValues = z.infer<typeof personalDataCollectedSchema>
export const personalDataCollectedFieldNames = personalDataCollectedSchema.keyof().options