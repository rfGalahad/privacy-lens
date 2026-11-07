import { useState } from 'react';

import type { PIAFormValues } from '../../schema/piaFormSchema';
import type { FinalizePayload, ResultMode } from '../../types/review';

import { mockAnalysis } from './mockAnalysis';
import { PIAResultView } from './PIAResultView';

const piaSampleData = {
  // A. General Information
  projectName: 'Clinic Patient Portal',
  projectDescription:
    'A web portal where patients of a community clinic book appointments, view lab results, and message their doctors.',
  department: 'Information Technology',
  responsibleOfficerName: 'Juan Dela Cruz',
  responsibleOfficerEmail: 'juan.delacruz@example.com',
  responsibleOfficerPhone: '09171234567',
  dateOfAssessment: '2026-11-01',

  // B. Purpose of Processing
  purposeOfProcessing:
    'To schedule appointments, deliver lab results securely, and enable communication between patients and clinic staff.',
  isPurposeDocumented: 'yes',
  consequencesOfNotCollecting:
    'Patients could not book online or receive results digitally, and the clinic would rely on slower manual processes.',

  // C. Personal Data Collected
  dataCategories: ['personal_information', 'contact_information', 'health_information'],
  specificDataElements:
    'Full name, birth date, address, mobile number, email, diagnosis, lab results, appointment history.',
  minorsDataInvolved: 'yes',

  // D. Data Subjects
  dataSubjects: ['patients', 'employees', 'others'],
  dataSubjectsOtherSpecify: 'Parents or guardians of minor patients',

  // E. Legal Basis
  legalBasis: ['consent', 'legitimate_interest'],
  legalBasisOtherSpecify: '',

  // F. Data Flow and Storage
  collectionMethod: 'Online registration form and in-person intake at the clinic front desk.',
  storageLocations: ['cloud', 'on_premise_server'],
  storageLocationOtherSpecify: '',
  isTransferredToThirdParties: 'yes',
  transferDetails:
    'Lab results are sent to a third-party lab partner; the cloud provider hosts the database in Singapore.',

  // G. Data Sharing
  isDataShared: 'yes',
  thirdPartyRecipients:
    'Partner laboratory (test processing) and SMS provider (appointment reminders).',
  hasSharingAgreement: 'no',

  // H. Data Retention
  retentionPeriod: '10 years after the last patient visit',
  disposalMethods: ['secure_deletion', 'shredding'],
  disposalOtherSpecify: '',

  // I. Security Measures
  organizationalSafeguards:
    'Privacy policy, annual staff privacy training, designated data protection officer.',
  physicalSafeguards: 'Locked server room, visitor logs, CCTV at the clinic.',
  technicalSafeguards:
    'HTTPS, password hashing, role-based access, database encryption at rest, daily backups.',

  // J. Privacy Risks
  identifiedRisks:
    'Unauthorized access to health records, data leak via the third-party lab, sharing without a formal agreement, and exposure of minors’ data.',
  riskLikelihood: 'medium',
  riskImpact: 'high',

  // K. Mitigation Measures
  existingControls:
    'Role-based access control, encryption, audit logging, and quarterly access reviews.',
  additionalControlsRequired: 'yes',
  additionalControlsSpecify:
    'Sign data sharing agreements with the lab and SMS provider, add multi-factor authentication, and run a penetration test.',
  residualRiskLevel: 'medium',

  // L. Approval and Sign-off
  preparedBy: { name: 'Juan Dela Cruz', signature: 'J. Dela Cruz', date: '2026-11-01' },
  reviewedBy: { name: 'Maria Santos', signature: 'M. Santos', date: '2026-11-01' },
  approvedBy: { name: 'Pedro Reyes', signature: 'P. Reyes', date: '2026-11-01' },
}

export const ResultPreviewPage = () => {

  const [mode, setMode] = useState<ResultMode>('view');
  const [finalized, setFinalized] = useState<FinalizePayload | null>(null);

  const handleReset = () => {
    setMode('view');
    setFinalized(null);
  };

  return (
    <div className="mx-auto flex flex-col gap-6 pt-6">
      <PIAResultView
        analysis={mockAnalysis}
        mode={mode}
        finalized={finalized}
        formValues={piaSampleData as unknown as PIAFormValues}
        onReset={handleReset}
        onStartReview={() => setMode('review')}
        onFinalize={(payload) => {
          setFinalized(payload);
          setMode('finalized');
        }}
      />
    </div>
  );
};