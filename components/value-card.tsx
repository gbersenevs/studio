import { ReactNode } from "react";

type ValueCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-white p-6 shadow-soft h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <h4 className="text-lg font-semibold text-text">{title}</h4>
      </div>
      <p className="text-sm text-text-muted">{description}</p>
    </div>
  );
}
