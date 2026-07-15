import "./LoadingPage.css";

interface LoadingPageProps {
  /** Short status message shown beneath the spinner */
  label?: string;
}

export default function LoadingPage({ label = "Loading" }: LoadingPageProps) {
  return (
    <div className="loading-page" role="status" aria-live="polite" aria-label={label}>
      <div className="spinner" aria-hidden="true" />
      <span className="label">{label}</span>
    </div>
  );
}