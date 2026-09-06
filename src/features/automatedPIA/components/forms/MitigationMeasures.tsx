import { ShieldAlert } from 'lucide-react'
import { withForm } from '@/lib/form'

import { FormButtons } from '../FormButtons'
import { piaFormDefaultValues } from '../../schema/piaFormSchema'
import { YES_NO_NA_OPTIONS, LOW_MEDIUM_HIGH_NA_OPTIONS } from '../../schema/sharedEnums'
import {
  mitigationMeasuresSchema,
  mitigationMeasuresFieldNames,
} from '../../schema/mitigationMeasuresSchema'

//-----------------------------------------------------------
// TYPES
//-----------------------------------------------------------

type MitigationMeasuresProps = {
  handleBack: () => void;
  handleNext: () => void;
  currentStep: number;
  totalSteps: number;
}

//-----------------------------------------------------------
// COMPONENT
//-----------------------------------------------------------

export const MitigationMeasures = withForm({
  defaultValues: piaFormDefaultValues,
  props: {} as MitigationMeasuresProps,
  render: ({ form, handleBack, handleNext, currentStep, totalSteps }) => {

    const handleNextClick = async () => {
      await form.validateAllFields('submit')

      const hasStepErrors = mitigationMeasuresFieldNames.some(
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
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold tracking-normal text-text-primary uppercase">
              Mitigation Measures
            </h2>
          </div>

          <span className="text-sm font-medium text-text-secondary">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        <div className='flex flex-col gap-4 px-4'>
          <form.AppField
            name="existingControls"
            validators={{
              onChange: mitigationMeasuresSchema.shape.existingControls,
              onBlur: mitigationMeasuresSchema.shape.existingControls,
            }}
          >
            {(field) => (
              <field.TextField
                label="What existing controls or measures are currently in place to address the identified privacy risks?"
                multiline
                rows={4}
                required
              />
            )}
          </form.AppField>

          <form.AppField
            name="additionalControlsRequired"
            validators={{
              onChange: mitigationMeasuresSchema.shape.additionalControlsRequired,
            }}
          >
            {(field) => (
              <field.RadioGroup
                label="Are there additional controls or mitigation measures required?"
                options={YES_NO_NA_OPTIONS}
                required
              />
            )}
          </form.AppField>

          <form.Subscribe selector={(state) => state.values.additionalControlsRequired}>
            {(value) =>
              value === 'yes' && (
                <form.AppField name="additionalControlsSpecify">
                  {(field) => (
                    <field.TextField
                      label="Please specify"
                      multiline
                      rows={3}
                    />
                  )}
                </form.AppField>
              )
            }
          </form.Subscribe>

          <form.AppField
            name="residualRiskLevel"
            validators={{
              onChange: mitigationMeasuresSchema.shape.residualRiskLevel,
            }}
          >
            {(field) => (
              <field.RadioGroup
                label="What is the residual risk level after implementing mitigation measures?"
                options={LOW_MEDIUM_HIGH_NA_OPTIONS}
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