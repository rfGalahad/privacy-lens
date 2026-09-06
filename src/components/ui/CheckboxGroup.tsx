import { useFieldContext } from '@/lib/form'

type Option = { label: string; value: string }

type CheckboxGroupProps = {
  label: string
  options: Option[]
  required?: boolean
}

export default function CheckboxGroup({ label, options, required }: CheckboxGroupProps) {
  const field = useFieldContext<string[]>()
  const value = field.state.value ?? []
  const errors = field.state.meta.errors

  const toggle = (optionValue: string) => {
    const next = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue]
    field.handleChange(next)
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-text-primary">
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </span>

      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer"
          >
            <input
              type="checkbox"
              checked={value.includes(option.value)}
              onChange={() => toggle(option.value)}
              className="h-4 w-4 rounded-sm border-border accent-accent"
            />
            {option.label}
          </label>
        ))}
      </div>

      {errors?.length > 0 && (
        <span className="text-sm text-danger">{errors[0]?.message ?? errors[0]}</span>
      )}
    </div>
  )
}