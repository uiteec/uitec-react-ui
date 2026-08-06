"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export type CardPadding = "none" | "sm" | "md" | "lg";

interface CardAtomProps {
  children: ReactNode;
  className?: string;
  padding?: CardPadding;
  shadow?: boolean;
  bordered?: boolean;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
}

const PADDING_MAP: Record<CardPadding, string> = {
  none: "",
  sm:   "p-3",
  md:   "p-5",
  lg:   "p-8",
};

export function CardAtom({ children, className, padding = "md", shadow = true, bordered = false, title, subtitle, action }: CardAtomProps) {
  const hasHeader = !!title;

  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden",
        shadow && "shadow-sm",
        !hasHeader && PADDING_MAP[padding],
        className,
      )}
      style={{
        background: "var(--background-modal)",
        border: bordered ? "1px solid var(--background-divisor)" : undefined,
      }}
    >
      {hasHeader && (
        <>
          <div
            className="flex items-start justify-between gap-3 px-5 py-4 border-b"
            style={{ borderColor: "var(--background-divisor)" }}
          >
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--font-default)" }}>
                {title}
              </p>
              {subtitle && (
                <p className="text-xs mt-0.5" style={{ color: "var(--font-vector)" }}>
                  {subtitle}
                </p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
          <div className={PADDING_MAP[padding]}>{children}</div>
        </>
      )}
      {!hasHeader && children}
    </div>
  );
}
