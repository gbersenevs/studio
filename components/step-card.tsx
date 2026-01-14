type StepCardProps = {
  step: number;
  title: string;
  description: string;
};

export function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-white p-6 shadow-soft">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
        {step}
      </div>
      <h4 className="text-lg font-semibold text-text mb-2">{title}</h4>
      <p className="text-sm text-text-muted">{description}</p>
    </div>
  );
}
