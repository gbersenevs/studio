"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLeadModal } from "./lead-modal-provider";

type CTAButtonProps = {
  label: string;
  href?: string;
  listingSlug?: string;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
};

const variantStyles: Record<NonNullable<CTAButtonProps["variant"]>, string> = {
  primary:
    "bg-primary text-white shadow-sm hover:shadow-md hover:bg-primary-600",
  ghost:
    "bg-white text-text border border-border hover:border-primary/50 hover:text-primary",
  outline:
    "text-primary border border-primary/60 hover:bg-primary/10 bg-white",
};

const sizeStyles: Record<NonNullable<CTAButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm md:text-base",
  lg: "px-6 py-3 text-base md:text-lg",
};

export function CTAButton({
  label,
  href,
  listingSlug,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: CTAButtonProps) {
  const { open } = useLeadModal();

  const classes = cn(
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        open(listingSlug);
      }}
      className={classes}
    >
      {label}
    </button>
  );
}
