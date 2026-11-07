interface LoadingPageProps {
  label?: string;
}

export const LoadingPage = ({ 
  label = "Loading" 
}: LoadingPageProps ) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className="flex flex-col items-center justify-center gap-4 min-h-screen bg-bg"
    >
      <div
        aria-hidden="true"
        className="
          w-8 h-8 rounded-full
          border-[2.5px] border-border border-t-accent
          animate-[spin_0.7s_linear_infinite]
          motion-reduce:[animation-duration:1.4s]
        "
      />
      <span className="font-body text-[0.8125rem] font-medium tracking-[0.02em] text-text-secondary">
        {label}
      </span>
    </div>
  );
}

export default LoadingPage;