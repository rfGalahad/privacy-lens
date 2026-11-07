import { callGemini, sanitize } from './ai.ts';
import { computeRisk } from './scoring.ts';

const sample = {
  projectName: 'Clinic Patient Portal',
  purposeOfProcessing: 'Book appointments and deliver lab results online.',
  isPurposeDocumented: 'yes',
  dataCategories: ['personal_information', 'health_information'],
  minorsDataInvolved: 'yes',
  dataSubjects: ['patients'],
  legalBasis: ['consent'],
  storageLocations: ['cloud'],
  isTransferredToThirdParties: 'yes',
  isDataShared: 'yes',
  hasSharingAgreement: 'no',
  retentionPeriod: '10 years',
  disposalMethods: ['secure_deletion'],
  organizationalSafeguards: 'Privacy training',
  physicalSafeguards: 'Locked server room',
  technicalSafeguards: 'HTTPS, encryption at rest',
  identifiedRisks: 'Leak of health records via the lab partner.',
  riskLikelihood: 'medium',
  riskImpact: 'high',
  existingControls: 'Role-based access',
  residualRiskLevel: 'medium',
};

const input = sanitize(sample);
const risk = computeRisk(input);
console.log('Computed risk:', risk);

const { analysis, tokensIn, tokensOut } = await callGemini(input, risk);
console.log('Gemini analysis:', JSON.stringify(analysis, null, 2));
console.log('Tokens:', { tokensIn, tokensOut });