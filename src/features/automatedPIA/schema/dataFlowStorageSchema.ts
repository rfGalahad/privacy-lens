import { z } from 'zod'
import { yesNoNaSchema } from './sharedEnums'

export const dataFlowStorageSchema = z.object({
  collectionMethod: z
    .string()
    .min(1, 'Please describe how personal data is collected')
    .max(2000, 'Must be under 2000 characters'),

  storageLocations: z
    .array(z.enum(['on_premise', 'cloud', 'third_party', 'others', 'na']))
    .min(1, 'Please select at least one option'),

  storageLocationOtherSpecify: z.string(),

  isTransferredToThirdParties: yesNoNaSchema,

  transferDetails: z.string(),
})

export type DataFlowStorageValues = z.infer<typeof dataFlowStorageSchema>
export const dataFlowStorageFieldNames = dataFlowStorageSchema.keyof().options