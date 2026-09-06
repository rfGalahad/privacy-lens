import { z } from 'zod'
import { yesNoNaSchema } from './sharedEnums'

export const dataSharingSchema = z.object({
  isDataShared: yesNoNaSchema,
  thirdPartyRecipients: z.string().optional().or(z.literal('')),
  hasSharingAgreement: yesNoNaSchema,
})

export type DataSharingValues = z.infer<typeof dataSharingSchema>
export const dataSharingFieldNames = dataSharingSchema.keyof().options