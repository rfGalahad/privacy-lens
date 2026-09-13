// components/forms/PersonalDataCollected.tsx
import { Database } from 'lucide-react'
import { withForm } from '@/lib/form'

import { FormButtons } from '../FormButtons'
import { piaFormDefaultValues } from '../../schema/piaFormSchema'
import { YES_NO_NA_OPTIONS } from '../../schema/sharedEnums'
import { DATA_CATEGORY_OPTIONS } from '../../constants/piaOptions'
import {
  personalDataCollectedSchema,
  personalDataCollectedFieldNames,
} from '../../schema/personalDataCollectedSchema'

//-----------------------------------------------------------
// TYPES
//-----------------------------------------------------------

type PersonalDataCollectedProps = {
  handleBack: () => void;
  handleNext: () => void;
  currentStep: number;
  totalSteps: number;
}

//-----------------------------------------------------------
// COMPONENT
//-----------------------------------------------------------

export const PersonalDataCollected = withForm({
  defaultValues: piaFormDefaultValues,
  props: {} as PersonalDataCollectedProps,
  render: ({ form, handleBack, handleNext, currentStep, totalSteps }) => {

    const handleNextClick = async () => {
      await form.validateAllFields('submit')

      const hasStepErrors = personalDataCollectedFieldNames.some(
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
              <Database className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold tracking-normal text-text-primary uppercase">
              Personal Data Collected
            </h2>
          </div>

          <span className="text-sm font-medium text-text-secondary">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        <div className='flex flex-col gap-4 px-4'>
          <form.AppField
            name="dataCategories"
            validators={{
              onChange: personalDataCollectedSchema.shape.dataCategories,
            }}
          >
            {(field) => (
              <field.CheckboxGroup
                label="What categories of personal data are collected?"
                options={DATA_CATEGORY_OPTIONS}
                required
              />
            )}
          </form.AppField>

          <form.AppField
            name="specificDataElements"
            validators={{
              onChange: personalDataCollectedSchema.shape.specificDataElements,
              onBlur: personalDataCollectedSchema.shape.specificDataElements,
            }}
          >
            {(field) => (
              <field.TextField
                label="List specific data elements collected"
                placeholder="e.g. full name, email, national ID number"
                multiline
                rows={3}
                required
              />
            )}
          </form.AppField>

          <form.AppField
            name="minorsDataInvolved"
            validators={{
              onChange: personalDataCollectedSchema.shape.minorsDataInvolved,
            }}
          >
            {(field) => (
              <field.RadioGroup
                legend="Are minors' data involved?"
                options={YES_NO_NA_OPTIONS}
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