"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleProps {
  children: React.ReactNode;
  triggerText?: string;
  collapsedText?: string;
  defaultOpen?: boolean;
  className?: string;
}

export function Collapsible({
  children,
  triggerText = "Show more",
  collapsedText = "Show less",
  defaultOpen = false,
  className,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={className}>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {children}
      </div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mt-4 inline-flex items-center gap-2 text-primary hover:text-primary-600 font-medium transition-colors"
      >
        {isOpen ? collapsedText : triggerText}
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
    </div>
  );
}

