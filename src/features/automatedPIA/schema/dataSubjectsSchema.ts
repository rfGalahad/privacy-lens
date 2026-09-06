import { z } from 'zod'

export const dataSubjectsSchema = z.object({
  dataSubjects: z
    .array(
      z.enum(['customers', 'employees', 'students', 'applicants', 'suppliers_partners', 'others', 'na'])
    )
    .min(1, 'Please select at least one option'),

  dataSubjectsOtherSpecify: z.string().optional().or(z.literal('')),
})

export type DataSubjectsValues = z.infer<typeof dataSubjectsSchema>
export const dataSubjectsFieldNames = dataSubjectsSchema.keyof().options