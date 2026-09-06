import { Archive } from 'lucide-react'
import { withForm } from '@/lib/form'

import { FormButtons } from '../FormButtons'
import { piaFormDefaultValues } from '../../schema/piaFormSchema'
import { DISPOSAL_METHOD_OPTIONS } from '../../constants/piaOptions'
import {
  dataRetentionSchema,
  dataRetentionFieldNames,
} from '../../schema/dataRetentionSchema'

//-----------------------------------------------------------
// TYPES
//-----------------------------------------------------------

type DataRetentionProps = {
  handleBack: () => void;
  handleNext: () => void;
  currentStep: number;
  totalSteps: number;
}

//-----------------------------------------------------------
// COMPONENT
//-----------------------------------------------------------

export const DataRetention = withForm({
  defaultValues: piaFormDefaultValues,
  props: {} as DataRetentionProps,
  render: ({ form, handleBack, handleNext, currentStep, totalSteps }) => {

    const handleNextClick = async () => {
      await form.validateAllFields('submit')

      const hasStepErrors = dataRetentionFieldNames.some(
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
              <Archive className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold tracking-normal text-text-primary uppercase">
              Data Retention
            </h2>
          </div>

          <span className="text-sm font-medium text-text-secondary">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        <div className='flex flex-col gap-4 px-4'>
          <form.AppField
            name="retentionPeriod"
            validators={{
              onChange: dataRetentionSchema.shape.retentionPeriod,
              onBlur: dataRetentionSchema.shape.retentionPeriod,
            }}
          >
            {(field) => (
              <field.TextField
                label="What is the retention period for personal data?"
                placeholder="e.g. 5 years after last transaction"
                required
              />
            )}
          </form.AppField>

          <form.AppField
            name="disposalMethods"
            validators={{
              onChange: dataRetentionSchema.shape.disposalMethods,
            }}
          >
            {(field) => (
              <field.CheckboxGroup
                label="How is personal data disposed of after the retention period?"
                options={DISPOSAL_METHOD_OPTIONS}
                required
              />
            )}
          </form.AppField>

          <form.Subscribe selector={(state) => state.values.disposalMethods}>
            {(disposalMethods) =>
              disposalMethods?.includes('others') && (
                <form.AppField name="disposalOtherSpecify">
                  {(field) => (
                    <field.TextField label="Please specify" placeholder="Other disposal method" />
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