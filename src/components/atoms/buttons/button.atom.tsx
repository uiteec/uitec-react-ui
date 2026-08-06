"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link" | "danger";
export type ButtonSize    = "sm" | "md" | "lg";

interface ButtonAtomProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, { bg: string; color: string; border: string; hoverClass: string }> = {
  primary: {
    bg:         "var(--primary-default)",
    color:      "var(--font-inverse)",
    border:     "transparent",
    hoverClass: "hover:opacity-85",
  },
  secondary: {
    bg:         "var(--sidebar-bg, #4e1126)",
    color:      "var(--font-inverse)",
    border:     "transparent",
    hoverClass: "hover:opacity-85",
  },
  outline: {
    bg:         "transparent",
    color:      "var(--primary-default)",
    border:     "var(--primary-default)",
    hoverClass: "hover:opacity-75",
  },
  ghost: {
    bg:         "transparent",
    color:      "var(--primary-default)",
    border:     "transparent",
    hoverClass: "hover:bg-background-hover-menu",
  },
  link: {
    bg:         "transparent",
    color:      "var(--primary-default)",
    border:     "transparent",
    hoverClass: "hover:underline",
  },
  danger: {
    bg:         "var(--error-300, #dc2626)",
    color:      "white",
    border:     "transparent",
    hoverClass: "hover:opacity-85",
  },
};

const sizeStyles: Record<ButtonSize, { height: string; px: string; text: string; iconSize: number }> = {
  sm: { height: "h-8",  px: "px-3", text: "text-xs",  iconSize: 14 },
  md: { height: "h-10", px: "px-5", text: "text-sm",  iconSize: 16 },
  lg: { height: "h-12", px: "px-6", text: "text-base", iconSize: 18 },
};

export function ButtonAtom({
  text,
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  icon: Icon,
  iconRight: IconRight,
  fullWidth = false,
  className,
  type = "button",
  ...rest
}: ButtonAtomProps) {
  const v = variantStyles[variant];
  const s = sizeStyles[size];
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={cn(
        s.height,
        s.px,
        s.text,
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all select-none",
        isDisabled ? "opacity-50 cursor-not-allowed" : cn("cursor-pointer", v.hoverClass),
        fullWidth && "w-full",
        className,
      )}
      style={{
        ...(v.bg !== "transparent" && { background: v.bg }),
        color:  v.color,
        border: v.border !== "transparent" ? `1.5px solid ${v.border}` : "none",
      }}
      {...rest}
    >
      {loading ? (
        <span
          className="inline-block rounded-full border-2 animate-spin shrink-0"
          style={{
            width:  s.iconSize,
            height: s.iconSize,
            borderColor: `${v.color} transparent transparent transparent`,
          }}
        />
      ) : Icon ? (
        <Icon size={s.iconSize} className="shrink-0" />
      ) : null}

      {text ?? children}

      {!loading && IconRight && (
        <IconRight size={s.iconSize} className="shrink-0" />
      )}
    </button>
  );
}
