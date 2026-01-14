import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  background?: "white" | "surface";
  id?: string;
}

export function Section({
  children,
  className,
  containerClassName,
  background = "white",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-20 lg:py-24",
        background === "surface" ? "bg-surface" : "bg-background",
        className
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", "mb-12", className)}>
      <h2 className="text-text mb-4">{title}</h2>
      {subtitle && (
        <p className={cn(
          "text-text-muted text-lg max-w-3xl",
          centered && "mx-auto"
        )}>{subtitle}</p>
      )}
    </div>
  );
}

