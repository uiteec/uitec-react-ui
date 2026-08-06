"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface ValueAtomProps {
  label: string;
  value: string | ReactNode;
  horizontal?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function ValueAtom({ label, value, horizontal = false, size = "md", className }: ValueAtomProps) {
  return (
    <div className={cn(horizontal ? "flex items-baseline gap-2" : "flex flex-col gap-0.5", className)}>
      <span
        className={cn("font-medium uppercase tracking-wide shrink-0", size === "sm" ? "text-[10px]" : "text-xs")}
        style={{ color: "var(--font-vector)" }}
      >
        {label}
      </span>
      <span
        className={cn("font-semibold", size === "sm" ? "text-sm" : "text-base")}
        style={{ color: "var(--font-default)" }}
      >
        {value}
      </span>
    </div>
  );
}
