import {
  ClipboardList,
  Target,
  Database,
  Users,
  Scale,
  Workflow,
  Share2,
  Archive,
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
  FileSignature,
} from 'lucide-react';

import { type FormStep, FormStepper } from '@/components/ui/FormStepper'
import { useStepper } from '@/hooks/useStepper';
import { useAppForm } from '@/lib/form';

import { piaFormDefaultValues, piaFormSchema } from '../schema/piaFormSchema';

import {
  GeneralInformation,
  PurposeOfProcessing,
  PersonalDataCollected,
  DataSubjects,
  LegalBasis,
  DataFlowStorage,
  DataSharing,
  DataRetention,
  SecurityMeasures,
  PrivacyRisks,
  MitigationMeasures,
  ApprovalSignOff,
} from '../components/forms';

const PIA_FORM_STEPS: FormStep[] = [
  { id: 'general-information', label: 'General Information', icon: ClipboardList },
  { id: 'processing-purpose', label: 'Purpose of Processing', icon: Target },
  { id: 'personal-data-collected', label: 'Personal Data Collected', icon: Database },
  { id: 'data-subjects', label: 'Data Subjects', icon: Users },
  { id: 'legal-basis', label: 'Legal Basis for Processing', icon: Scale },
  { id: 'data-flow-storage', label: 'Data Flow and Storage', icon: Workflow },
  { id: 'data-sharing', label: 'Data Sharing', icon: Share2 },
  { id: 'data-retention', label: 'Data Retention', icon: Archive },
  { id: 'security-measures', label: 'Security Measures', icon: ShieldCheck },
  { id: 'privacy-risks', label: 'Privacy Risks Identified', icon: AlertTriangle },
  { id: 'mitigation-measures', label: 'Mitigation Measures', icon: ShieldAlert },
  { id: 'approval-sign-off', label: 'Approval and Sign-off', icon: FileSignature },
];

export const QuickStartPIAPage = () => {

  const {
    activeStep,
    page,
    handleStepClick,
    handleBack,
    handleNext
  } = useStepper(PIA_FORM_STEPS.length);

  const form = useAppForm({
    defaultValues: piaFormDefaultValues,
    validators: {
      onSubmit: piaFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log('submit', value)
    },
  })

  const stepProps = {
    form,
    handleBack,
    handleNext,
    currentStep: page,
    totalSteps: PIA_FORM_STEPS.length,
  }

  return (
    <div className="mx-auto flex flex-col gap-6 pt-6">
      <FormStepper
        steps={PIA_FORM_STEPS}
        activeStep={activeStep}
        onStepClick={handleStepClick}
      />

      <div className="rounded-md border border-border">
        <div className="flex flex-col">
          {page === 1 && <GeneralInformation {...stepProps} />}
          {page === 2 && <PurposeOfProcessing {...stepProps} />}
          {page === 3 && <PersonalDataCollected {...stepProps} />}
          {page === 4 && <DataSubjects {...stepProps} />}
          {page === 5 && <LegalBasis {...stepProps} />}
          {page === 6 && <DataFlowStorage {...stepProps} />}
          {page === 7 && <DataSharing {...stepProps} />}
          {page === 8 && <DataRetention {...stepProps} />}
          {page === 9 && <SecurityMeasures {...stepProps} />}
          {page === 10 && <PrivacyRisks {...stepProps} />}
          {page === 11 && <MitigationMeasures {...stepProps} />}
          {page === 12 && <ApprovalSignOff {...stepProps} />}
        </div>
      </div>
    </div>
  )
}