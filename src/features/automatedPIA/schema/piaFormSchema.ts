import { z } from 'zod'

import { generalInformationSchema } from './generalInformationSchema'
import { purposeOfProcessingSchema } from './purposeOfProcessingSchema'
import { personalDataCollectedSchema } from './personalDataCollectedSchema'
import { dataSubjectsSchema } from './dataSubjectsSchema'
import { legalBasisSchema } from './legalBasisSchema'
import { dataFlowStorageSchema } from './dataFlowStorageSchema'
import { dataSharingSchema } from './dataSharingSchema'
import { dataRetentionSchema } from './dataRetentionSchema'
import { securityMeasuresSchema } from './securityMeasuresSchema'
import { privacyRisksSchema } from './privacyRisksSchema'
import { mitigationMeasuresSchema } from './mitigationMeasuresSchema'
import { approvalSignOffSchema } from './approvalSignOffSchema'

const piaFormObjectSchema = z.object({
  ...generalInformationSchema.shape,
  ...purposeOfProcessingSchema.shape,
  ...personalDataCollectedSchema.shape,
  ...dataSubjectsSchema.shape,
  ...legalBasisSchema.shape,
  ...dataFlowStorageSchema.shape,
  ...dataSharingSchema.shape,
  ...dataRetentionSchema.shape,
  ...securityMeasuresSchema.shape,
  ...privacyRisksSchema.shape,
  ...mitigationMeasuresSchema.shape,
  ...approvalSignOffSchema.shape,
})

// Final safety net for the "if yes / if others, specify" fields, enforced on full submit.
// The step components already give live feedback for these via field-level validators.
export const piaFormSchema = piaFormObjectSchema.superRefine((data, ctx) => {
  const requireSpecify = (
    condition: boolean,
    path: keyof typeof data,
    message: string
  ) => {
    if (condition && !data[path]) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: [path], message })
    }
  }

  requireSpecify(
    data.dataSubjects.includes('others'),
    'dataSubjectsOtherSpecify',
    'Please specify the other data subjects'
  )
  requireSpecify(
    data.legalBasis.includes('others'),
    'legalBasisOtherSpecify',
    'Please specify the other legal basis'
  )
  requireSpecify(
    data.storageLocations.includes('others'),
    'storageLocationOtherSpecify',
    'Please specify the other storage location'
  )
  requireSpecify(
    data.isTransferredToThirdParties === 'yes',
    'transferDetails',
    'Please specify the transfer details'
  )
  requireSpecify(
    data.isDataShared === 'yes',
    'thirdPartyRecipients',
    'Please identify the third-party recipients and purpose of sharing'
  )
  requireSpecify(
    data.disposalMethods.includes('others'),
    'disposalOtherSpecify',
    'Please specify the other disposal method'
  )
  requireSpecify(
    data.additionalControlsRequired === 'yes',
    'additionalControlsSpecify',
    'Please specify the additional controls or mitigation measures'
  )
})

export type PIAFormValues = z.infer<typeof piaFormSchema>

const emptySignOff = { name: '', signature: '', date: '' }


export const piaFormDefaultValues = {
  // A. General Information
  projectName: '',
  projectDescription: '',
  department: '',
  responsibleOfficerName: '',
  responsibleOfficerEmail: '',
  responsibleOfficerPhone: '',
  dateOfAssessment: '',

  // B. Purpose of Processing
  purposeOfProcessing: '',
  isPurposeDocumented: '',
  consequencesOfNotCollecting: '',

  // C. Personal Data Collected
  dataCategories: [] as string[],
  specificDataElements: '',
  minorsDataInvolved: '',

  // D. Data Subjects
  dataSubjects: [] as string[],
  dataSubjectsOtherSpecify: '',

  // E. Legal Basis
  legalBasis: [] as string[],
  legalBasisOtherSpecify: '',

  // F. Data Flow and Storage
  collectionMethod: '',
  storageLocations: [] as string[],
  storageLocationOtherSpecify: '',
  isTransferredToThirdParties: '',
  transferDetails: '',

  // G. Data Sharing
  isDataShared: '',
  thirdPartyRecipients: '',
  hasSharingAgreement: '',

  // H. Data Retention
  retentionPeriod: '',
  disposalMethods: [] as string[],
  disposalOtherSpecify: '',

  // I. Security Measures
  organizationalSafeguards: '',
  physicalSafeguards: '',
  technicalSafeguards: '',

  // J. Privacy Risks
  identifiedRisks: '',
  riskLikelihood: '',
  riskImpact: '',

  // K. Mitigation Measures
  existingControls: '',
  additionalControlsRequired: '',
  additionalControlsSpecify: '',
  residualRiskLevel: '',

  // L. Approval and Sign-off
  preparedBy: { ...emptySignOff },
  reviewedBy: { ...emptySignOff },
  approvedBy: { ...emptySignOff },
}