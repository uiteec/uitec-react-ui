"use client";

import { type ReactNode, useState } from "react";
import { Check, SlidersHorizontal, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ButtonAtom } from "./button.atom";

interface FiltroAtomProps {
  children: ReactNode;
  filtrosAtivos?: number;
  onLimpar?: () => void;
  onAplicar?: () => void;
  onOpen?: () => void;
  className?: string;
}

export function FiltroAtom({
  children,
  filtrosAtivos = 0,
  onLimpar,
  onAplicar,
  onOpen,
  className,
}: FiltroAtomProps) {
  const [open, setOpen] = useState(false);

  function handleOpenChange(next: boolean) {
    if (next) onOpen?.();
    setOpen(next);
  }

  function handleAplicar() {
    onAplicar?.();
    setOpen(false);
  }

  function handleLimpar() {
    onLimpar?.();
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "relative flex h-9 items-center gap-1.5 rounded-xl px-3 text-sm text-font-vector transition-colors hover:bg-background-hover hover:text-font-default",
            filtrosAtivos > 0 && "text-primary-default",
            className
          )}
        >
          <SlidersHorizontal size={14} />
          <span>Filtros</span>
          {filtrosAtivos > 0 && (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary-default px-1 text-[10px] font-semibold text-white">
              {filtrosAtivos}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" sideOffset={6} className="w-auto min-w-72 max-h-(--radix-popover-content-available-height) overflow-y-auto p-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-background-divisor px-4 py-3">
          <span className="text-sm font-semibold text-font-default">Filtros avançados</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-6 w-6 items-center justify-center rounded-md text-font-vector transition-colors hover:bg-background-hover hover:text-font-default"
          >
            <X size={14} />
          </button>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-4 px-4 py-4">{children}</div>

        {/* Footer */}
        {(onLimpar || onAplicar) && (
          <div className="flex w-full items-center border-t border-background-divisor px-4 py-3">
            {onAplicar && (
              <ButtonAtom icon={Check} text="Aplicar" onClick={handleAplicar} />
            )}
            <div className="flex-1" />
            {onLimpar && (
              <ButtonAtom variant="ghost" icon={Trash2} text="Limpar" onClick={handleLimpar} />
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
