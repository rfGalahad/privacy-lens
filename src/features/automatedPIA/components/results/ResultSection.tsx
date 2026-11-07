import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type ResultSectionProps = {
  icon: LucideIcon;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
};

export const ResultSection = ({ icon: Icon, title, aside, children }: ResultSectionProps) => (
  <section className="rounded-md border border-border bg-surface">
    <div className="flex items-center justify-between border-b border-border px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center rounded-sm bg-accent-dim p-2 text-accent">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-semibold uppercase text-text-primary">{title}</h2>
      </div>
      {aside}
    </div>
    <div className="p-5">{children}</div>
  </section>
);