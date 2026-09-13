import { z } from 'zod'
import { yesNoNaSchema } from './sharedEnums'

export const dataSharingSchema = z.object({
  isDataShared: yesNoNaSchema,
  thirdPartyRecipients: z.string(),
  hasSharingAgreement: yesNoNaSchema,
})

export type DataSharingValues = z.infer<typeof dataSharingSchema>
export const dataSharingFieldNames = dataSharingSchema.keyof().options