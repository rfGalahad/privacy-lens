import './SubmitButton.css';

interface SubmitButtonProps {
  isLoading: boolean;
  label: string;
}

const SubmitButton = ({ 
  isLoading,
  label
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={`submit-btn${isLoading ? " loading" : ""}`}
      disabled={isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? <span className="spinner" aria-label="Signing in…" /> : label}
    </button>
  );
}

export default SubmitButton;