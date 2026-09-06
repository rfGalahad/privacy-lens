// components/forms/SecurityMeasures.tsx
import { ShieldCheck } from 'lucide-react'
import { withForm } from '@/lib/form'

import { FormButtons } from '../FormButtons'
import { piaFormDefaultValues } from '../../schema/piaFormSchema'
import {
  securityMeasuresSchema,
  securityMeasuresFieldNames,
} from '../../schema/securityMeasuresSchema'

//-----------------------------------------------------------
// TYPES
//-----------------------------------------------------------

type SecurityMeasuresProps = {
  handleBack: () => void;
  handleNext: () => void;
  currentStep: number;
  totalSteps: number;
}

//-----------------------------------------------------------
// COMPONENT
//-----------------------------------------------------------

export const SecurityMeasures = withForm({
  defaultValues: piaFormDefaultValues,
  props: {} as SecurityMeasuresProps,
  render: ({ form, handleBack, handleNext, currentStep, totalSteps }) => {

    const handleNextClick = async () => {
      await form.validateAllFields('submit')

      const hasStepErrors = securityMeasuresFieldNames.some(
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
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold tracking-normal text-text-primary uppercase">
              Security Measures
            </h2>
          </div>

          <span className="text-sm font-medium text-text-secondary">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        <div className='flex flex-col gap-4 px-4'>
          <form.AppField
            name="organizationalSafeguards"
            validators={{
              onChange: securityMeasuresSchema.shape.organizationalSafeguards,
              onBlur: securityMeasuresSchema.shape.organizationalSafeguards,
            }}
          >
            {(field) => (
              <field.TextField
                label="Organizational safeguards"
                placeholder="e.g. policies, procedures, staff training, access control rules"
                multiline
                rows={3}
                required
              />
            )}
          </form.AppField>

          <form.AppField
            name="physicalSafeguards"
            validators={{
              onChange: securityMeasuresSchema.shape.physicalSafeguards,
              onBlur: securityMeasuresSchema.shape.physicalSafeguards,
            }}
          >
            {(field) => (
              <field.TextField
                label="Physical safeguards"
                placeholder="e.g. secured offices, locked cabinets, restricted areas"
                multiline
                rows={3}
                required
              />
            )}
          </form.AppField>

          <form.AppField
            name="technicalSafeguards"
            validators={{
              onChange: securityMeasuresSchema.shape.technicalSafeguards,
              onBlur: securityMeasuresSchema.shape.technicalSafeguards,
            }}
          >
            {(field) => (
              <field.TextField
                label="Technical safeguards"
                placeholder="e.g. encryption, authentication, firewalls, system access controls"
                multiline
                rows={3}
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