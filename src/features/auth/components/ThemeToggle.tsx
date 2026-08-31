const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

interface ThemeToggleProps {
  theme: "dark" | "light"; 
  onToggle: () => void;
}

const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => (
  <button
    type="button"
    className="fixed bottom-6 right-6 z-100 w-11 h-11 rounded-full border border-border
               bg-surface-2 text-text-secondary cursor-pointer
               flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.25)]
               transition-[background-color,border-color,color,transform,box-shadow] duration-(--transition)
               hover:bg-surface hover:border-accent hover:text-accent
               hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.3),0_0_0_3px_var(--color-accent-dim)]
               active:translate-y-0 active:scale-95
               focus-visible:outline focus-visible:outline-accent focus-visible:outline-offset-[3px]
               [&_svg]:w-4.5 [&_svg]:h-4.5 [&_svg]:transition-transform [&_svg]:duration-[0.4s] [&_svg]:ease-[cubic-bezier(0.34,1.56,0.64,1)]
               hover:[&_svg]:rotate-20"
    onClick={onToggle}
    aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
  >
    {theme === "dark" ? <SunIcon /> : <MoonIcon />}
  </button>
);

export default ThemeToggle;