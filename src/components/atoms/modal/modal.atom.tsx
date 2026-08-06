"use client";

import { X } from "lucide-react";
import { type ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";

export type ModalSize = "sm" | "md" | "lg" | "xl";

export interface ModalAtomProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
}

const SIZE_MAP: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function ModalAtom({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = "md",
  closeOnBackdrop = true,
}: ModalAtomProps) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        className={cn("relative w-full rounded-2xl shadow-2xl overflow-hidden", SIZE_MAP[size])}
        style={{ background: "var(--background-card)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div
            className="flex items-start justify-between gap-3 px-6 py-4 border-b"
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
            <button
              onClick={onClose}
              className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-(--background-default) cursor-pointer"
              style={{ color: "var(--font-vector)" }}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {!title && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-(--background-default) cursor-pointer"
            style={{ color: "var(--font-vector)" }}
          >
            <X size={16} />
          </button>
        )}

        <div className="p-6">{children}</div>

        {footer && (
          <div
            className="px-6 py-4 border-t flex items-center justify-between gap-3"
            style={{ borderColor: "var(--background-divisor)" }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
