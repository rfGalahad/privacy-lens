import { useState } from "react";
import { Briefcase, Building2, Check, Loader2, Users } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import PDGLogo from '@/assets/logo-pdg-1.png';

//-----------------------------------------------------------
// INTERFACE / TYPES
//-----------------------------------------------------------

export interface Tier {
  name: string;
  price: string;
  description: string;
  features: string[];
}

interface TierCardProps {
  tier: Tier;
  currency?: string;
  loading?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

//-----------------------------------------------------------
// HELPERS
//-----------------------------------------------------------

const getIcon = (name: string) => {
  // Use the accent token via CSS var so the icon color follows theme
  const props = { size: 24, color: "var(--color-accent)" };
  switch (name) {
    case "Basic":
      return <Briefcase {...props} />;
    case "Professional":
      return <Users {...props} />;
    case "Enterprise":
      return <Building2 {...props} />;
    default:
      return <Briefcase {...props} />;
  }
};

//-----------------------------------------------------------
// MAIN COMPONENT
//-----------------------------------------------------------

export const TierCard = ({
  tier,
  currency = "₱",
  loading = false,
  disabled = false,
  onSelect,
}: TierCardProps) => {

  const [isHovered, setIsHovered] = useState(false);
  const { name, price, description, features } = tier;
  const toast = useToast();
  const TierIcon = getIcon(name);

  const handleClick = () => {
    if (loading || disabled) return;
    if (onSelect) {
      onSelect();
    } else {
      toast.info("This feature is under development.");
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={[
        "border-border border-2",
        "relative flex h-full flex-col overflow-hidden rounded-lg bg-surface p-6",
        "transition-all duration-300 ease-in-out",
        isHovered
          ? "-translate-y-1 border-accent"
          : "translate-y-0 shadow-sm",
        disabled && !loading ? "opacity-60" : "",
      ].join(" ")}
    >
      {/* TIER HEADER */}
      <div className="mb-6 flex flex-col">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-dim">
          {TierIcon}
        </div>

        <p className="mb-1 text-sm font-semibold text-text-primary">{name}</p>

        <p className="mb-3 text-xs leading-relaxed text-text-secondary">
          {description}
        </p>

        {/* PRICING */}
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold leading-none text-text-primary">
            {currency}{price}
          </span>
          <span className="text-sm font-medium text-text-secondary">/month</span>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="mb-6 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="z-1 flex flex-1 flex-col justify-between">
        {/* FEATURES LIST */}
        <div>
          {features.map((feature) => (
            <div key={feature} className="mb-2 flex items-start gap-2">
              <Check className="mt-0.75 h-4 w-4 shrink-0 text-accent" />
              <p className="text-sm leading-relaxed text-text-secondary">
                {feature}
              </p>
            </div>
          ))}
        </div>

        {/* REGISTER BUTTON */}
        <button
          onClick={handleClick}
          disabled={disabled || loading}
          aria-busy={loading}
          className={[
            "z-1 mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-text-primary py-3",
            "text-sm font-semibold normal-case text-text-primary transition-all duration-300 ease-in-out",
            disabled || loading
              ? "cursor-not-allowed opacity-70"
              : "cursor-pointer hover:bg-text-primary hover:text-bg",
          ].join(" ")}
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Redirecting…" : "Subscribe"}
        </button>
      </div>

      {/* PDG LOGO */}
      <img
        src={PDGLogo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-1.25 z-0 h-[60%] w-auto opacity-10 lg:-right-10"
      />
    </div>
  );
};

export default TierCard;