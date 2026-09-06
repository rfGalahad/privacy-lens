import { AlertTriangle } from 'lucide-react'
import { withForm } from '@/lib/form'

import { FormButtons } from '../FormButtons'
import { piaFormDefaultValues } from '../../schema/piaFormSchema'
import { LOW_MEDIUM_HIGH_NA_OPTIONS } from '../../schema/sharedEnums'
import {
  privacyRisksSchema,
  privacyRisksFieldNames,
} from '../../schema/privacyRisksSchema'

//-----------------------------------------------------------
// TYPES
//-----------------------------------------------------------

type PrivacyRisksProps = {
  handleBack: () => void;
  handleNext: () => void;
  currentStep: number;
  totalSteps: number;
}

//-----------------------------------------------------------
// COMPONENT
//-----------------------------------------------------------

export const PrivacyRisks = withForm({
  defaultValues: piaFormDefaultValues,
  props: {} as PrivacyRisksProps,
  render: ({ form, handleBack, handleNext, currentStep, totalSteps }) => {

    const handleNextClick = async () => {
      await form.validateAllFields('submit')

      const hasStepErrors = privacyRisksFieldNames.some(
        (name) => (form.getFieldMeta(name)?.errors?.length ?? 0) > 0
      )

      if (!hasStepErrors) {
        handleNext()
      }
    }

    return (
      <div className="flex flex-col gap-6 bg-surface rounded-sm">
        <div className="flex items-center justify-between border-b border-border px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-sm p-2 bg-accent-dim text-accent">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold tracking-normal text-text-primary uppercase">
              Privacy Risks Identified
            </h2>
          </div>

          <span className="text-sm font-medium text-text-secondary">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        <div className='flex flex-col gap-4 px-4'>
          <form.AppField
            name="identifiedRisks"
            validators={{
              onChange: privacyRisksSchema.shape.identifiedRisks,
              onBlur: privacyRisksSchema.shape.identifiedRisks,
            }}
          >
            {(field) => (
              <field.TextField
                label="Identify potential privacy risks related to the processing of personal data"
                placeholder="e.g. unauthorized access, data leakage, excessive data collection"
                multiline
                rows={4}
                required
              />
            )}
          </form.AppField>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <form.AppField
              name="riskLikelihood"
              validators={{
                onChange: privacyRisksSchema.shape.riskLikelihood,
              }}
            >
              {(field) => (
                <field.RadioGroup
                  label="Likelihood"
                  options={LOW_MEDIUM_HIGH_NA_OPTIONS}
                  required
                />
              )}
            </form.AppField>

            <form.AppField
              name="riskImpact"
              validators={{
                onChange: privacyRisksSchema.shape.riskImpact,
              }}
            >
              {(field) => (
                <field.RadioGroup
                  label="Impact"
                  options={LOW_MEDIUM_HIGH_NA_OPTIONS}
                  required
                />
              )}
            </form.AppField>
          </div>
        </div>

        <FormButtons
          onBack={handleBack}
          onNext={handleNextClick}
          backDisabled={currentStep === 1}
        />
      </div>
    )
  },
})