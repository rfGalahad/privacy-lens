import { z } from 'zod'

const signOffEntrySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  signature: z.string().min(1, 'Signature is required'),
  date: z.string().min(1, 'Date is required'),
})

export const approvalSignOffSchema = z.object({
  preparedBy: signOffEntrySchema,
  reviewedBy: signOffEntrySchema, // Data Protection Officer
  approvedBy: signOffEntrySchema,
})

export type ApprovalSignOffValues = z.infer<typeof approvalSignOffSchema>
export const approvalSignOffFieldNames = approvalSignOffSchema.keyof().options