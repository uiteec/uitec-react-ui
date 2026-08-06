"use client";

import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "warning" | "info";

interface ToastAtomProps {
  variant?: ToastVariant;
  title?: string;
  message: string;
  onClose?: () => void;
  action?: { label: string; onClick: () => void };
  className?: string;
}

const CONFIG: Record<ToastVariant, { icon: React.ElementType; accent: string }> = {
  success: { icon: CheckCircle,   accent: "#16a34a" },
  error:   { icon: XCircle,       accent: "#dc2626" },
  warning: { icon: AlertTriangle, accent: "#d97706" },
  info:    { icon: Info,          accent: "#2563eb" },
};

export function ToastAtom({ variant = "info", title, message, onClose, action, className }: ToastAtomProps) {
  const { icon: Icon, accent } = CONFIG[variant];
  return (
    <div
      className={cn("flex items-start gap-3 px-4 py-3 rounded-xl shadow-md w-80 max-w-full", className)}
      style={{
        background: "var(--background-modal)",
        border: "1px solid var(--background-stroke)",
        borderLeft: `4px solid ${accent}`,
      }}
    >
      <Icon size={18} style={{ color: accent, flexShrink: 0, marginTop: 1 }} />
      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-sm font-semibold leading-tight mb-0.5" style={{ color: "var(--font-default)" }}>
            {title}
          </p>
        )}
        <p className="text-xs leading-snug" style={{ color: "var(--font-vector)" }}>
          {message}
        </p>
        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 text-xs font-semibold underline-offset-2 hover:underline"
            style={{ color: accent }}
          >
            {action.label}
          </button>
        )}
      </div>
      {onClose && (
        <button onClick={onClose} className="shrink-0 opacity-50 hover:opacity-100 transition-opacity mt-0.5">
          <X size={14} style={{ color: "var(--font-default)" }} />
        </button>
      )}
    </div>
  );
}
