import "./LoadingPage.css";

interface LoadingPageProps {
  /** Short status message shown beneath the spinner */
  label?: string;
  /** Product / brand name shown in the wordmark */
  brandName?: string;
}

export default function LoadingPage({
  label = "Loading",
  brandName = "Folia",
}: LoadingPageProps) {
  return (
    <div className="loading-page" role="status" aria-live="polite" aria-label={label}>
      {/* Ambient glow layer */}
      <div className="loading-page__glow" aria-hidden="true" />

      <div className="loading-page__content">
        {/* Logo */}
        <div className="loading-page__logo">
          <div className="loading-page__logo-mark" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5Z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="loading-page__wordmark">{brandName}</span>
        </div>

        {/* Spinner + label + progress */}
        <div className="loading-page__spinner-wrap">
          <div className="loading-page__spinner" aria-hidden="true" />
          <span className="loading-page__label">{label}</span>
          <div className="loading-page__progress-track" aria-hidden="true">
            <div className="loading-page__progress-fill" />
          </div>
        </div>
      </div>

      {/* Bottom tagline */}
      <p className="loading-page__tagline" aria-hidden="true">
        Crafted with care
      </p>
    </div>
  );
}