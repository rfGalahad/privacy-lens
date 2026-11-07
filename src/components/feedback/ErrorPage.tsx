import { Link } from "react-router-dom";

interface ErrorPageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  backTo?: string;
  backLabel?: string;
}

export const ErrorPage = ({
  title = "Something went wrong",
  message = "We couldn't complete that request. Please try again.",
  onRetry,
  backTo,
  backLabel = "Go back",
}: ErrorPageProps) => {
  return (
    <main
      role="alert"
      className="flex flex-col items-center justify-center gap-4 min-h-screen bg-bg p-6 text-center font-body"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-error-dim text-error">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <h1 className="text-2xl font-semibold text-text-primary">{title}</h1>
      <p className="max-w-md text-text-secondary leading-relaxed">{message}</p>

      <div className="mt-2 flex items-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="cursor-pointer rounded-md bg-accent px-5 py-2 text-sm font-medium
                       text-text-on-light-primary transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Try again
          </button>
        )}
        {backTo && (
          <Link
            to={backTo}
            className="rounded-md border border-border px-5 py-2 text-sm font-medium
                       text-text-primary transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {backLabel}
          </Link>
        )}
      </div>
    </main>
  );
};

export default ErrorPage;