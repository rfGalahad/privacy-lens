import { Workflow } from 'lucide-react'
import { withForm } from '@/lib/form'

import { FormButtons } from '../FormButtons'
import { piaFormDefaultValues } from '../../schema/piaFormSchema'
import { YES_NO_NA_OPTIONS } from '../../schema/sharedEnums'
import { STORAGE_LOCATION_OPTIONS } from '../../constants/piaOptions'
import {
  dataFlowStorageSchema,
  dataFlowStorageFieldNames,
} from '../../schema/dataFlowStorageSchema'

//-----------------------------------------------------------
// TYPES
//-----------------------------------------------------------

type DataFlowStorageProps = {
  handleBack: () => void;
  handleNext: () => void;
  currentStep: number;
  totalSteps: number;
}

//-----------------------------------------------------------
// COMPONENTS
//-----------------------------------------------------------

export const DataFlowStorage = withForm({
  defaultValues: piaFormDefaultValues,
  props: {} as DataFlowStorageProps,
  render: ({ form, handleBack, handleNext, currentStep, totalSteps }) => {

    const handleNextClick = async () => {
      await form.validateAllFields('submit')

      const hasStepErrors = dataFlowStorageFieldNames.some(
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
              <Workflow className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold tracking-normal text-text-primary uppercase">
              Data Flow and Storage
            </h2>
          </div>

          <span className="text-sm font-medium text-text-secondary">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        <div className='flex flex-col gap-4 px-4'>
          <form.AppField
            name="collectionMethod"
            validators={{
              onChange: dataFlowStorageSchema.shape.collectionMethod,
              onBlur: dataFlowStorageSchema.shape.collectionMethod,
            }}
          >
            {(field) => (
              <field.TextField
                label="How is personal data collected?"
                placeholder="e.g. online forms, paper forms, system uploads, third-party sources"
                multiline
                rows={3}
                required
              />
            )}
          </form.AppField>

          <form.AppField
            name="storageLocations"
            validators={{
              onChange: dataFlowStorageSchema.shape.storageLocations,
            }}
          >
            {(field) => (
              <field.CheckboxGroup
                label="Where is personal data stored?"
                options={STORAGE_LOCATION_OPTIONS}
                required
              />
            )}
          </form.AppField>

          <form.Subscribe selector={(state) => state.values.storageLocations}>
            {(storageLocations) =>
              storageLocations?.includes('others') && (
                <form.AppField name="storageLocationOtherSpecify">
                  {(field) => (
                    <field.TextField label="Please specify" placeholder="Other storage location" />
                  )}
                </form.AppField>
              )
            }
          </form.Subscribe>

          <form.AppField
            name="isTransferredToThirdParties"
            validators={{
              onChange: dataFlowStorageSchema.shape.isTransferredToThirdParties,
            }}
          >
            {(field) => (
              <field.RadioGroup
                legend="Is personal data transferred to third parties or outside the organization?"
                options={YES_NO_NA_OPTIONS}
              />
            )}
          </form.AppField>

          <form.Subscribe selector={(state) => state.values.isTransferredToThirdParties}>
            {(value) =>
              value === 'yes' && (
                <form.AppField name="transferDetails">
                  {(field) => (
                    <field.TextField
                      label="Please specify"
                      placeholder="Details of the transfer"
                      multiline
                      rows={3}
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