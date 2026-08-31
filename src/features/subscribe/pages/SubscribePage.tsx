import { useAuth } from "@/features/auth";
import TierCard from "../components/TierCard";

//-----------------------------------------------------------
// CONSTANTS
//-----------------------------------------------------------

const TIERS = [
  {
    name: "Basic",
    price: "999",
    description: "Ideal for small businesses conducting their first PIA.",
    features: ["1 Privacy Impact Assessment (PIA) project"],
  },
  {
    name: "Professional",
    price: "2,999",
    description: "For growing organizations with multiple data processes.",
    features: [
      "10 Privacy Impact Assessment (PIA) projects",
      "Risk Dashboard",
    ],
    highlighted: true,
    badge: "Most popular",
  },
  {
    name: "Enterprise",
    price: "8,999",
    description: "Full-scale PIA for complex, multi-department environments.",
    features: [
      "Unlimited Privacy Impact Assessment (PIA) projects",
      "Risk Dashboard",
      "Team Access",
    ],
  },
];

export const SubscribePage = () => {

  const { user, logout } = useAuth();

  return (
    <main
      className="w-full min-h-screen flex items-center justify-center p-6 
                 relative overflow-hidden font-body text-text-primary bg-cover bg-center"
    >
      <div className="mx-auto max-w-6xl w-full">
        {/* ACCOUNT BAR */}
        <div className="mb-6 flex items-center justify-end gap-3 text-sm text-[#5B6560]">
          {user?.email && (
            <span>
              Signed in as <span className="font-medium">{user.email}</span>
            </span>
          )}
          <button
            type="button"
            onClick={() => logout()}
            className="cursor-pointer underline underline-offset-2 hover:text-primary focus-visible:outline focus-visible:outline-accent rounded-sm"
          >
            Not you? Sign out
          </button>
        </div>

        {/* HEADING */}
        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            Hi! <span className="text-accent">{user?.name}</span>, Choose your plan.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-text-secondary">
            Pick the plan that fits your organization's size and compliance needs.
            You can change plans anytime.
          </p>
        </div>

        {/* TIER CARDS */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 items-start">
          {TIERS.map((tier) => (
            <TierCard tier={tier}/>
          ))}
        </div>
      </div>
    </main>
  );
};