import Button from "@/components/ui/Button" 

interface FormButtonsProps {
  onBack?: () => void
  onNext: () => void
  backLabel?: string
  nextLabel?: string
  backDisabled?: boolean
  nextDisabled?: boolean
  isLoading?: boolean
  hideBack?: boolean
}

export function FormButtons({
  onBack,
  onNext,
  backLabel = "Previous Step",
  nextLabel = "Next Step",
  backDisabled = false,
  nextDisabled = false,
  isLoading = false,
  hideBack = false,
}: FormButtonsProps) {
  return (
    <div className="flex flex-col-reverse justify-end gap-3 border-t border-border bg-surface-2 p-4 sm:flex-row sm:gap-4">
      {!hideBack && (
        <Button
          label={backLabel}
          variant="outlined"
          color="primary"
          onClick={onBack}
          disabled={backDisabled || isLoading}
          fullWidth
        />
      )}
      <Button
        label={nextLabel}
        variant="filled"
        color="accent"
        onClick={onNext}
        disabled={nextDisabled || isLoading}
        fullWidth
      />
    </div>
  )
}