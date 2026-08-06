"use client";

import { cn } from "@/lib/utils";
import { type ElementType, type ReactNode } from "react";

export type TextVariant = "h1" | "h2" | "h3" | "h4" | "body" | "body-sm" | "caption" | "label" | "overline";
export type TextColor   = "default" | "secondary" | "disabled" | "inverse" | "primary" | "error" | "success";

interface TextAtomProps {
  variant?: TextVariant;
  color?: TextColor;
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

const VARIANT_STYLES: Record<TextVariant, string> = {
  h1:         "text-3xl font-bold leading-tight",
  h2:         "text-2xl font-bold leading-snug",
  h3:         "text-xl font-semibold leading-snug",
  h4:         "text-base font-semibold leading-snug",
  body:       "text-sm leading-relaxed",
  "body-sm":  "text-xs leading-relaxed",
  caption:    "text-xs leading-normal",
  label:      "text-sm font-medium leading-none",
  overline:   "text-[10px] font-semibold uppercase tracking-wider leading-none",
};

const DEFAULT_TAG: Record<TextVariant, ElementType> = {
  h1: "h1", h2: "h2", h3: "h3", h4: "h4",
  body: "p", "body-sm": "p", caption: "span", label: "span", overline: "span",
};

const COLOR_VAR: Record<TextColor, string> = {
  default:   "var(--font-default)",
  secondary: "var(--font-vector)",
  disabled:  "rgba(0,0,0,0.3)",
  inverse:   "var(--font-inverse)",
  primary:   "var(--primary-default)",
  error:     "var(--error-300)",
  success:   "#16a34a",
};

export function TextAtom({ variant = "body", color = "default", children, className, as }: TextAtomProps) {
  const Tag = as ?? DEFAULT_TAG[variant];
  return (
    <Tag className={cn(VARIANT_STYLES[variant], className)} style={{ color: COLOR_VAR[color] }}>
      {children}
    </Tag>
  );
}
