import { z } from 'zod'

export const legalBasisSchema = z.object({
  legalBasis: z
    .array(
      z.enum([
        'consent',
        'contract_performance',
        'legal_obligation',
        'legitimate_interests',
        'public_task',
        'others',
        'na',
      ])
    )
    .min(1, 'Please select at least one option'),

  legalBasisOtherSpecify: z.string(),
})

export type LegalBasisValues = z.infer<typeof legalBasisSchema>
export const legalBasisFieldNames = legalBasisSchema.keyof().options