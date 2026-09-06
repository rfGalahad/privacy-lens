import { z } from 'zod'
import { yesNoNaSchema, lowMediumHighNaSchema } from './sharedEnums'

export const mitigationMeasuresSchema = z.object({
  existingControls: z
    .string()
    .min(1, 'Please describe the existing controls or measures')
    .max(2000, 'Must be under 2000 characters'),

  additionalControlsRequired: yesNoNaSchema,
  additionalControlsSpecify: z.string().optional().or(z.literal('')),
  residualRiskLevel: lowMediumHighNaSchema,
})

export type MitigationMeasuresValues = z.infer<typeof mitigationMeasuresSchema>
export const mitigationMeasuresFieldNames = mitigationMeasuresSchema.keyof().options