import { Share2 } from 'lucide-react'
import { withForm } from '@/lib/form'

import { FormButtons } from '../FormButtons'
import { piaFormDefaultValues } from '../../schema/piaFormSchema'
import { YES_NO_NA_OPTIONS } from '../../schema/sharedEnums'
import {
  dataSharingSchema,
  dataSharingFieldNames,
} from '../../schema/dataSharingSchema'

//-----------------------------------------------------------
// TYPES
//-----------------------------------------------------------

type DataSharingProps = {
  handleBack: () => void;
  handleNext: () => void;
  currentStep: number;
  totalSteps: number;
}

//-----------------------------------------------------------
// COMPONENT
//-----------------------------------------------------------

export const DataSharing = withForm({
  defaultValues: piaFormDefaultValues,
  props: {} as DataSharingProps,
  render: ({ form, handleBack, handleNext, currentStep, totalSteps }) => {

    const handleNextClick = async () => {
      await form.validateAllFields('submit')

      const hasStepErrors = dataSharingFieldNames.some(
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
              <Share2 className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold tracking-normal text-text-primary uppercase">
              Data Sharing
            </h2>
          </div>

          <span className="text-sm font-medium text-text-secondary">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        <div className='flex flex-col gap-4 px-4'>
          <form.AppField
            name="isDataShared"
            validators={{
              onChange: dataSharingSchema.shape.isDataShared,
            }}
          >
            {(field) => (
              <field.RadioGroup
                label="Is personal data shared with third parties?"
                options={YES_NO_NA_OPTIONS}
                required
              />
            )}
          </form.AppField>

          <form.Subscribe selector={(state) => state.values.isDataShared}>
            {(value) =>
              value === 'yes' && (
                <form.AppField name="thirdPartyRecipients">
                  {(field) => (
                    <field.TextField
                      label="Identify the third-party recipients and purpose of sharing"
                      placeholder="e.g. service providers, regulators, partners"
                      multiline
                      rows={3}
                    />
                  )}
                </form.AppField>
              )
            }
          </form.Subscribe>

          <form.AppField
            name="hasSharingAgreement"
            validators={{
              onChange: dataSharingSchema.shape.hasSharingAgreement,
            }}
          >
            {(field) => (
              <field.RadioGroup
                label="Is there a data sharing or processing agreement in place with third parties?"
                options={YES_NO_NA_OPTIONS}
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