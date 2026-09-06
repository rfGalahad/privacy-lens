import { z } from 'zod'

export const generalInformationSchema = z.object({
  projectName: z
    .string()
    .min(1, 'Project name is required')
    .max(200, 'Project name must be under 200 characters'),

  projectDescription: z
    .string()
    .min(1, 'Project description is required')
    .max(2000, 'Project description must be under 2000 characters'),

  department: z
    .string()
    .min(1, 'Department is required'),

  responsibleOfficerName: z
    .string()
    .min(1, 'Responsible officer name is required'),

  responsibleOfficerEmail: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),

  responsibleOfficerPhone: z
    .string()
    .or(z.literal('')),

  dateOfAssessment: z
    .string()
    .min(1, 'Start date is required')
})

export type GeneralInformationValues = z.infer<typeof generalInformationSchema>

// Used to scope "Next" step validation to just this step's fields
export const generalInformationFieldNames = generalInformationSchema.keyof().options