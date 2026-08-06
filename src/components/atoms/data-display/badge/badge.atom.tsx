"use client";

import { cn } from "@/lib/utils";

export type BadgeVariant = "primary" | "secondary" | "success" | "error" | "warning" | "info" | "neutral";
export type BadgeSize = "sm" | "md";

interface BadgeAtomProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, { bg: string; color: string; dotColor: string }> = {
  primary:   { bg: "rgba(99,22,48,0.12)",    color: "#631630", dotColor: "#631630" },
  secondary: { bg: "rgba(78,17,38,0.10)",    color: "#4e1126", dotColor: "#4e1126" },
  success:   { bg: "rgba(22,163,74,0.10)",   color: "#15803d", dotColor: "#16a34a" },
  error:     { bg: "rgba(220,38,38,0.10)",   color: "#b91c1c", dotColor: "#dc2626" },
  warning:   { bg: "rgba(217,119,6,0.10)",   color: "#92400e", dotColor: "#d97706" },
  info:      { bg: "rgba(37,99,235,0.10)",   color: "#1d4ed8", dotColor: "#2563eb" },
  neutral:   { bg: "rgba(100,116,139,0.12)", color: "#475569", dotColor: "#64748b" },
};

export function BadgeAtom({ label, variant = "primary", size = "md", dot, className }: BadgeAtomProps) {
  const { bg, color, dotColor } = VARIANT_STYLES[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-semibold rounded-full",
        size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1",
        className,
      )}
      style={{ background: bg, color }}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dotColor }} />}
      {label}
    </span>
  );
}
