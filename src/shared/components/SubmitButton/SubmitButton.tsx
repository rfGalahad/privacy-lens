import './SubmitButton.css';

interface SubmitButtonProps {
  isLoading: boolean;
  handleSubmit: () => void;
}

const SubmitButton = ({ 
  isLoading, 
  handleSubmit 
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={`submit-btn${isLoading ? " loading" : ""}`}
      onClick={handleSubmit}
      disabled={isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? <span className="spinner" aria-label="Signing in…" /> : "Sign In"}
    </button>
  );
}

export default SubmitButton;