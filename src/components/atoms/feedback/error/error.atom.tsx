"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorAtomProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorAtom({
  title = "Algo deu errado",
  message = "Ocorreu um erro inesperado. Tente novamente.",
  onRetry,
  className,
}: ErrorAtomProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 py-12 px-6 text-center", className)}>
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: "rgba(220,38,38,0.08)" }}
      >
        <AlertCircle size={26} style={{ color: "#dc2626" }} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold" style={{ color: "var(--font-default)" }}>{title}</p>
        <p className="text-xs max-w-xs" style={{ color: "var(--font-vector)" }}>{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-80"
          style={{ background: "rgba(220,38,38,0.10)", color: "#b91c1c" }}
        >
          <RefreshCw size={14} />
          Tentar novamente
        </button>
      )}
    </div>
  );
}
