import '../styles/SuccessPanel.css';

const SuccessPanel = () => {
  return (
    <div className="success-panel visible" role="status" aria-live="polite">
      <div className="icon" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17l-5-5" stroke="#4ab87e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="heading">
        Password <em>updated.</em>
      </h2>
      <p className="description">
        Your new password is set. You can now sign in to your account with your new credentials.
      </p>
    </div>
  );
}

export default SuccessPanel;