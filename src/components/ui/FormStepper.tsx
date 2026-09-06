import type { LucideIcon } from 'lucide-react'
import { Check } from 'lucide-react'

//-----------------------------------------------------------
// TYPES
//-----------------------------------------------------------

export interface FormStep {
  id: string
  label: string
  icon?: LucideIcon // no longer required — minimalist version uses numbers/checks
}

interface FormStepperProps {
  steps: ReadonlyArray<FormStep>
  activeStep?: number
  onStepClick?: (index: number) => void
}

//-----------------------------------------------------------
// MINIMAL REGISTRATION STEPPER
//-----------------------------------------------------------

export const FormStepper = ({
  steps,
  activeStep = 0,
  onStepClick,
}: FormStepperProps) => {
  return (
    <div className="px-2 w-full">
      <ol className="flex w-full items-center">
        {steps.map((step, index) => {
          const isDone = index < activeStep
          const isActive = index === activeStep
          const isClickable = isDone && !!onStepClick
          const isLast = index === steps.length - 1

          return (
            <li key={step.id} className="flex flex-1 items-center last:flex-none">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick?.(index)}
                aria-current={isActive ? 'step' : undefined}
                title={step.label}
                className={[
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-medium transition-colors duration-200',
                  isActive && 'bg-accent text-text-primary',
                  isDone && !isActive && 'bg-accent/20 text-accent',
                  !isActive && !isDone && 'bg-white/[0.14] text-white/40',
                  isClickable ? 'cursor-pointer' : 'cursor-default',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {isDone && !isActive ? <Check size={12} /> : index + 1}
              </button>

              {!isLast && (
                <div className="mx-2 h-px flex-1 bg-white/[0.14]">
                  <div
                    className="h-px bg-accent transition-[width] duration-300"
                    style={{ width: isDone ? '100%' : '0%' }}
                  />
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default FormStepper