import { FileSignature } from 'lucide-react'
import { withForm } from '@/lib/form'

import { FormButtons } from '../FormButtons'
import { piaFormDefaultValues } from '../../schema/piaFormSchema'

//-----------------------------------------------------------
// TYPES
//-----------------------------------------------------------

type ApprovalSignOffProps = {
  handleBack: () => void;
  handleNext: () => void;
  currentStep: number;
  totalSteps: number;
  isSubmitting?: boolean;
}

//-----------------------------------------------------------
// CONSTANT
//-----------------------------------------------------------

const SIGN_OFF_ROWS = [
  { key: 'preparedBy', label: 'Prepared by' },
  { key: 'reviewedBy', label: 'Reviewed by (Data Protection Officer)' },
  { key: 'approvedBy', label: 'Approved by' },
] as const

//-----------------------------------------------------------
// COMPONENT
//-----------------------------------------------------------
 
export const ApprovalSignOff = withForm({
  defaultValues: piaFormDefaultValues,
  props: {} as ApprovalSignOffProps,
  render: ({ form, handleBack, currentStep, totalSteps, isSubmitting }) => {

    const handleSubmitClick = () => form.handleSubmit();
    
    return (
      <div className="flex flex-col gap-6 bg-surface rounded-sm">
        <div className="flex items-center justify-between border-b border-border px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-sm p-2 bg-accent-dim text-accent">
              <FileSignature className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold tracking-normal text-text-primary uppercase">
              Approval and Sign-off
            </h2>
          </div>

          <span className="text-sm font-medium text-text-secondary">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        <div className='flex flex-col gap-6 px-4'>
          {SIGN_OFF_ROWS.map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-3 border-b border-border pb-4 last:border-b-0">
              <h3 className="text-sm font-semibold text-text-primary">{label}</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <form.AppField name={`${key}.name`}>
                  {(field) => <field.TextField label="Name" required />}
                </form.AppField>
                <form.AppField name={`${key}.signature`}>
                  {(field) => <field.TextField label="Signature" required />}
                </form.AppField>
                <form.AppField name={`${key}.date`}>
                  {(field) => <field.TextField label="Date" type="date" required />}
                </form.AppField>
              </div>
            </div>
          ))}
        </div>

        <FormButtons
          nextLabel={isSubmitting ? 'Analyzing…' : 'Submit PIA'}
          onBack={handleBack}
          onNext={handleSubmitClick}
          backDisabled={currentStep === 1}
          nextDisabled={isSubmitting}
        />
      </div>
    )
  },
})