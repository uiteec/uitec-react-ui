"use client";

import { cn } from "@/lib/utils";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

interface TooltipAtomProps {
  content: string;
  children: React.ReactNode;
  placement?: TooltipPlacement;
  className?: string;
}

const PLACEMENT: Record<TooltipPlacement, string> = {
  top:    "bottom-full left-1/2 -translate-x-1/2 mb-1.5",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-1.5",
  left:   "right-full top-1/2 -translate-y-1/2 mr-1.5",
  right:  "left-full top-1/2 -translate-y-1/2 ml-1.5",
};

export function TooltipAtom({ content, children, placement = "top", className }: TooltipAtomProps) {
  return (
    <span className={cn("relative inline-flex group/tt", className)}>
      {children}
      <span
        className={cn(
          "absolute z-50 px-2 py-1 text-xs font-medium rounded-lg whitespace-nowrap pointer-events-none",
          "opacity-0 group-hover/tt:opacity-100 transition-opacity duration-150",
          PLACEMENT[placement],
        )}
        style={{
          background: "var(--primary-default)",
          color: "var(--font-inverse)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
        }}
      >
        {content}
      </span>
    </span>
  );
}
