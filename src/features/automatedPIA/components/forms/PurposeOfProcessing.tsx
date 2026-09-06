import { Target } from 'lucide-react'
import { withForm } from '@/lib/form'

import { FormButtons } from '../FormButtons'
import { piaFormDefaultValues } from '../../schema/piaFormSchema'
import { YES_NO_NA_OPTIONS } from '../../schema/sharedEnums'
import {
  purposeOfProcessingSchema,
  purposeOfProcessingFieldNames,
} from '../../schema/purposeOfProcessingSchema'

//-----------------------------------------------------------
// TYPES
//-----------------------------------------------------------

type PurposeOfProcessingProps = {
  handleBack: () => void;
  handleNext: () => void;
  currentStep: number;
  totalSteps: number;
}

//-----------------------------------------------------------
// COMPONENTS
//-----------------------------------------------------------

export const PurposeOfProcessing = withForm({
  defaultValues: piaFormDefaultValues,
  props: {} as PurposeOfProcessingProps,
  render: ({ form, handleBack, handleNext, currentStep, totalSteps }) => {

    const handleNextClick = async () => {
      await form.validateAllFields('submit')

      const hasStepErrors = purposeOfProcessingFieldNames.some(
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
              <Target className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold tracking-normal text-text-primary uppercase">
              Purpose of Processing
            </h2>
          </div>

          <span className="text-sm font-medium text-text-secondary">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        <div className='flex flex-col gap-4 px-4'>
          <form.AppField
            name="purposeOfProcessing"
            validators={{
              onChange: purposeOfProcessingSchema.shape.purposeOfProcessing,
              onBlur: purposeOfProcessingSchema.shape.purposeOfProcessing,
            }}
          >
            {(field) => (
              <field.TextField
                label="What is the purpose of processing personal data?"
                placeholder="Describe the purpose"
                multiline
                rows={4}
                required
              />
            )}
          </form.AppField>

          <form.AppField
            name="isPurposeDocumented"
            validators={{
              onChange: purposeOfProcessingSchema.shape.isPurposeDocumented,
            }}
          >
            {(field) => (
              <field.RadioGroup
                label="Is the purpose clearly defined and documented?"
                options={YES_NO_NA_OPTIONS}
                required
              />
            )}
          </form.AppField>

          <form.AppField
            name="consequencesOfNotCollecting"
            validators={{
              onChange: purposeOfProcessingSchema.shape.consequencesOfNotCollecting,
              onBlur: purposeOfProcessingSchema.shape.consequencesOfNotCollecting,
            }}
          >
            {(field) => (
              <field.TextField
                label="What would happen if the personal data is not collected?"
                placeholder="Describe the consequences"
                multiline
                rows={4}
                required
              />
            )}
          </form.AppField>
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