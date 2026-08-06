"use client";

import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertVariant = "success" | "error" | "warning" | "info";

interface AlertAtomProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

const CONFIG: Record<AlertVariant, { icon: React.ElementType; bg: string; border: string; titleColor: string; msgColor: string; iconColor: string }> = {
  success: { icon: CheckCircle,   bg: "rgba(22,163,74,0.08)",  border: "rgba(22,163,74,0.3)",  titleColor: "#15803d", msgColor: "#166534", iconColor: "#16a34a" },
  error:   { icon: XCircle,       bg: "rgba(220,38,38,0.08)",  border: "rgba(220,38,38,0.3)",  titleColor: "#b91c1c", msgColor: "#991b1b", iconColor: "#dc2626" },
  warning: { icon: AlertTriangle, bg: "rgba(217,119,6,0.08)",  border: "rgba(217,119,6,0.3)",  titleColor: "#b45309", msgColor: "#92400e", iconColor: "#d97706" },
  info:    { icon: Info,          bg: "rgba(37,99,235,0.08)",  border: "rgba(37,99,235,0.3)",  titleColor: "#1d4ed8", msgColor: "#1e40af", iconColor: "#2563eb" },
};

export function AlertAtom({ variant = "info", title, message, onClose, className }: AlertAtomProps) {
  const { icon: Icon, bg, border, titleColor, msgColor, iconColor } = CONFIG[variant];
  return (
    <div
      className={cn("flex items-start gap-3 px-4 py-3 rounded-xl", className)}
      style={{ background: bg, border: `1px solid ${border}` }}
    >
      <Icon size={18} style={{ color: iconColor, flexShrink: 0, marginTop: 1 }} />
      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-sm font-semibold leading-tight mb-0.5" style={{ color: titleColor }}>
            {title}
          </p>
        )}
        <p className="text-sm leading-snug" style={{ color: msgColor }}>
          {message}
        </p>
      </div>
      {onClose && (
        <button onClick={onClose} className="shrink-0 opacity-60 hover:opacity-100 transition-opacity">
          <X size={14} style={{ color: msgColor }} />
        </button>
      )}
    </div>
  );
}
