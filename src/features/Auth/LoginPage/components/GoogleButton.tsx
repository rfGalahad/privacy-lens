import '../styles/GoogleButton.css';

const GOOGLE_ICON = (
  <svg className="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.08-6.08C34.46 3.05 29.56 1 24 1 14.82 1 7.07 6.48 3.64 14.22l7.08 5.5C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.1 24.55c0-1.57-.14-3.08-.4-4.55H24v8.6h12.42c-.54 2.9-2.18 5.36-4.64 7.01l7.19 5.58C43.46 37.13 46.1 31.3 46.1 24.55z"/>
    <path fill="#FBBC05" d="M10.72 28.28A14.6 14.6 0 0 1 9.5 24c0-1.49.26-2.93.72-4.28l-7.08-5.5A22.93 22.93 0 0 0 1 24c0 3.77.9 7.34 2.64 10.45l7.08-6.17z"/>
    <path fill="#34A853" d="M24 47c5.56 0 10.22-1.84 13.63-5l-7.19-5.58c-1.84 1.24-4.2 1.98-6.44 1.98-6.26 0-11.57-4.22-13.28-9.9l-7.08 5.5C7.07 41.52 14.82 47 24 47z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
);

const GoogleButton = () => {

  const handleGoogleLogin = () => {
    console.log("Google login triggered");
  };

  return (
    <button
      type="button"
      className="google-btn"
      onClick={handleGoogleLogin}
      aria-label="Sign in with Google"
    >
      {GOOGLE_ICON}
      Continue with Google
    </button>
  )
}

export default GoogleButton;