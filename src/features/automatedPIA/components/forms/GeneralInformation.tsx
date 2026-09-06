import { FileText } from 'lucide-react'
import { withForm } from '@/lib/form'

import { FormButtons } from '../FormButtons'
import { DEPARTMENT_OPTIONS } from '../../constants/departments'
import { piaFormDefaultValues } from '../../schema/piaFormSchema'
import {
  generalInformationSchema,
  generalInformationFieldNames,
} from '../../schema/generalInformationSchema'


//-----------------------------------------------------------
// TYPES
//-----------------------------------------------------------

type GeneralInformationProps = {
  handleBack: () => void;
  handleNext: () => void;
  currentStep: number;
  totalSteps: number;
}

//-----------------------------------------------------------
// GENERAL INFORMATION STEP
//-----------------------------------------------------------

export const GeneralInformation = withForm({
  defaultValues: piaFormDefaultValues,
  props: {} as GeneralInformationProps,
  render: ({ form, handleBack, handleNext, currentStep, totalSteps }) => {

    const handleNextClick = async () => {
      // Only fields mounted on this step get validated here,
      // so this naturally scopes to Step 1's fields.
      await form.validateAllFields('submit')

      const hasStepErrors = generalInformationFieldNames.some(
        (name) => (form.getFieldMeta(name)?.errors?.length ?? 0) > 0
      )

      if (!hasStepErrors) {
        handleNext()
      }
    }

    return (
      <div className="flex flex-col gap-6 bg-surface rounded-sm">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-border px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-sm p-2 bg-accent-dim text-accent">
              <FileText className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold tracking-normal text-text-primary uppercase">
              General Information
            </h2>
          </div>

          <span className="text-sm font-medium text-text-secondary">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        {/* FORM */}
        <div className='flex flex-col gap-4 px-4'>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <form.AppField
              name="projectName"
              validators={{
                onSubmit: generalInformationSchema.shape.projectName,
              }}
            >
              {(field) => (
                <field.TextField
                  label="Project Name"
                  placeholder="e.g. Customer Data Platform Migration"
                  required
                />
              )}
            </form.AppField>

            <form.AppField
              name="department"
              validators={{
                onSubmit: generalInformationSchema.shape.department,
              }}
            >
              {(field) => (
                <field.ComboBox
                  label="Department"
                  placeholder="Select a department"
                  options={DEPARTMENT_OPTIONS}
                  required
                />
              )}
            </form.AppField>
          </div>

          <form.AppField
            name="projectDescription"
            validators={{
              onSubmit: generalInformationSchema.shape.projectDescription,
            }}
          >
            {(field) => (
              <field.TextField
                label="Project Description"
                placeholder="Briefly describe the project, its objectives, and scope"
                multiline
                rows={4}
                required
              />
            )}
          </form.AppField>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <form.AppField
              name="responsibleOfficerName"
              validators={{
                onSubmit: generalInformationSchema.shape.responsibleOfficerName,
              }}
            >
              {(field) => (
                <field.TextField
                  label="Responsible Officer"
                  placeholder="Full name"
                  required
                />
              )}
            </form.AppField>

            <form.AppField
              name="responsibleOfficerEmail"
              validators={{
                onSubmit: generalInformationSchema.shape.responsibleOfficerEmail,
              }}
            >
              {(field) => (
                <field.TextField
                  label="Responsible Officer Email"
                  type="email"
                  placeholder="name@organization.com"
                  required
                />
              )}
            </form.AppField>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <form.AppField name="responsibleOfficerPhone">
              {(field) => (
                <field.TextField
                  label="Responsible Officer Phone"
                  placeholder="Optional"
                  type="tel"
                />
              )}
            </form.AppField>

            <form.AppField
              name="dateOfAssessment"
              validators={{
                onSubmit: generalInformationSchema.shape.dateOfAssessment,
              }}
            >
              {(field) => (
                <field.TextField
                  label="Project Start Date"
                  type="date"
                  required
                />
              )}
            </form.AppField>
          </div>
        </div>

        {/* FORM BUTTONS */}
        <FormButtons
          onBack={handleBack}
          onNext={handleNextClick}
          backDisabled={currentStep === 1}
        />
      </div>
    )
  },
})