import { z } from 'zod'

export const dataRetentionSchema = z.object({
  retentionPeriod: z
    .string()
    .min(1, 'Please specify the retention period')
    .max(500, 'Must be under 500 characters'),

  disposalMethods: z
    .array(z.enum(['secure_deletion', 'anonymization', 'physical_destruction', 'others', 'na']))
    .min(1, 'Please select at least one option'),

  disposalOtherSpecify: z.string(),
})

export type DataRetentionValues = z.infer<typeof dataRetentionSchema>
export const dataRetentionFieldNames = dataRetentionSchema.keyof().options