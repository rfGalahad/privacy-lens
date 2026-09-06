import { z } from 'zod'

export const securityMeasuresSchema = z.object({
  organizationalSafeguards: z
    .string()
    .min(1, 'Please describe the organizational safeguards')
    .max(2000, 'Must be under 2000 characters'),

  physicalSafeguards: z
    .string()
    .min(1, 'Please describe the physical safeguards')
    .max(2000, 'Must be under 2000 characters'),

  technicalSafeguards: z
    .string()
    .min(1, 'Please describe the technical safeguards')
    .max(2000, 'Must be under 2000 characters'),
})

export type SecurityMeasuresValues = z.infer<typeof securityMeasuresSchema>
export const securityMeasuresFieldNames = securityMeasuresSchema.keyof().options