import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-600 focus:ring-primary shadow-sm hover:shadow-md",
  secondary:
    "bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-500 shadow-sm",
  outline:
    "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white focus:ring-primary",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  disabled = false,
  className,
  onClick,
}: ButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={baseClasses}
    >
      {children}
    </button>
  );
}
