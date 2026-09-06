import { Users } from 'lucide-react'
import { withForm } from '@/lib/form'

import { FormButtons } from '../FormButtons'
import { piaFormDefaultValues } from '../../schema/piaFormSchema'
import { DATA_SUBJECT_OPTIONS } from '../../constants/piaOptions'
import {
  dataSubjectsSchema,
  dataSubjectsFieldNames,
} from '../../schema/dataSubjectsSchema'

//-----------------------------------------------------------
// TYPES
//-----------------------------------------------------------

type DataSubjectsProps = {
  handleBack: () => void;
  handleNext: () => void;
  currentStep: number;
  totalSteps: number;
}

//-----------------------------------------------------------
// COMPONENTS
//-----------------------------------------------------------

export const DataSubjects = withForm({
  defaultValues: piaFormDefaultValues,
  props: {} as DataSubjectsProps,
  render: ({ form, handleBack, handleNext, currentStep, totalSteps }) => {

    const handleNextClick = async () => {
      await form.validateAllFields('submit')

      const hasStepErrors = dataSubjectsFieldNames.some(
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
              <Users className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold tracking-normal text-text-primary uppercase">
              Data Subjects
            </h2>
          </div>

          <span className="text-sm font-medium text-text-secondary">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        <div className='flex flex-col gap-4 px-4'>
          <form.AppField
            name="dataSubjects"
            validators={{
              onChange: dataSubjectsSchema.shape.dataSubjects,
            }}
          >
            {(field) => (
              <field.CheckboxGroup
                label="Who are the data subjects involved?"
                options={DATA_SUBJECT_OPTIONS}
                required
              />
            )}
          </form.AppField>

          <form.Subscribe selector={(state) => state.values.dataSubjects}>
            {(dataSubjects) =>
              dataSubjects?.includes('others') && (
                <form.AppField
                  name="dataSubjectsOtherSpecify"
                  validators={{
                    onChange: ({ value, fieldApi }) =>
                      fieldApi.form.getFieldValue('dataSubjects')?.includes('others') && !value
                        ? 'Please specify the other data subjects'
                        : undefined,
                  }}
                >
                  {(field) => (
                    <field.TextField label="Please specify" placeholder="Other data subjects" />
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