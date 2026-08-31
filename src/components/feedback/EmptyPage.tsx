import { LayoutGrid } from "lucide-react";


export const EmptyPage = () => {
  return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-3 h-10 w-10 rounded-lg bg-surface-2 border border-border flex items-center justify-center">
            <LayoutGrid className="h-5 w-5 text-text-muted" />
          </div>
          <p className="text-sm text-text-secondary">Nothing here yet</p>
        </div>
      </div>
  );
};

export default EmptyPage;