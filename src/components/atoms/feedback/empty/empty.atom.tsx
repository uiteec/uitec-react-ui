"use client";

import { PackageOpen, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyAtomProps {
  title?: string;
  message?: string;
  icon?: LucideIcon;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export function EmptyAtom({
  title = "Nenhum resultado encontrado",
  message = "Não há dados para exibir no momento.",
  icon: Icon = PackageOpen,
  action,
  className,
}: EmptyAtomProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 py-12 px-6 text-center", className)}>
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.05)" }}
      >
        <Icon size={26} style={{ color: "var(--font-vector)" }} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold" style={{ color: "var(--font-default)" }}>{title}</p>
        <p className="text-xs max-w-xs" style={{ color: "var(--font-vector)" }}>{message}</p>
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-1 text-sm font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-80"
          style={{ background: "var(--primary-default)", color: "#fff" }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
