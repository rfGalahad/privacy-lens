import { Scale } from 'lucide-react'
import { withForm } from '@/lib/form'

import { FormButtons } from '../FormButtons'
import { piaFormDefaultValues } from '../../schema/piaFormSchema'
import { LEGAL_BASIS_OPTIONS } from '../../constants/piaOptions'
import {
  legalBasisSchema,
  legalBasisFieldNames,
} from '../../schema/legalBasisSchema'

//-----------------------------------------------------------
// TYPES
//-----------------------------------------------------------

type LegalBasisProps = {
  handleBack: () => void;
  handleNext: () => void;
  currentStep: number;
  totalSteps: number;
}

//-----------------------------------------------------------
// COMPONENTS
//-----------------------------------------------------------

export const LegalBasis = withForm({
  defaultValues: piaFormDefaultValues,
  props: {} as LegalBasisProps,
  render: ({ form, handleBack, handleNext, currentStep, totalSteps }) => {

    const handleNextClick = async () => {
      await form.validateAllFields('submit')

      const hasStepErrors = legalBasisFieldNames.some(
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
              <Scale className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold tracking-normal text-text-primary uppercase">
              Legal Basis for Processing
            </h2>
          </div>

          <span className="text-sm font-medium text-text-secondary">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        <div className='flex flex-col gap-4 px-4'>
          <form.AppField
            name="legalBasis"
            validators={{
              onChange: legalBasisSchema.shape.legalBasis,
            }}
          >
            {(field) => (
              <field.CheckboxGroup
                label="What is the legal basis for processing personal data?"
                options={LEGAL_BASIS_OPTIONS}
                required
              />
            )}
          </form.AppField>

          <form.Subscribe selector={(state) => state.values.legalBasis}>
            {(legalBasis) =>
              legalBasis?.includes('others') && (
                <form.AppField name="legalBasisOtherSpecify">
                  {(field) => (
                    <field.TextField
                      label="Please specify"
                      placeholder="Other legal basis"
                    />
                  )}
                </form.AppField>
              )
            }
          </form.Subscribe>
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