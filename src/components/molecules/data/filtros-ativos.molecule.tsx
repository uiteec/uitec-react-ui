"use client";

import { X } from "lucide-react";

export interface FiltroAtivoItem {
  label: string;
  onRemover: () => void;
}

interface FiltrosAtivosMoleculeProps {
  filtros: FiltroAtivoItem[];
  onLimparTudo?: () => void;
}

export function FiltrosAtivosMolecule({ filtros, onLimparTudo }: FiltrosAtivosMoleculeProps) {
  if (filtros.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-background-divisor px-4 py-2">
      <span className="text-xs text-font-vector shrink-0">Filtros:</span>

      {filtros.map((filtro, i) => (
        <span
          key={i}
          className="flex items-center gap-1 rounded-full border border-primary-default/30 bg-primary-default/10 px-2.5 py-0.5 text-xs font-medium text-primary-default"
        >
          {filtro.label}
          <button
            type="button"
            onClick={filtro.onRemover}
            className="ml-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full hover:bg-primary-default/20 transition-colors"
          >
            <X size={9} strokeWidth={2.5} />
          </button>
        </span>
      ))}

      {onLimparTudo && filtros.length > 1 && (
        <button
          type="button"
          onClick={onLimparTudo}
          className="text-xs text-font-vector underline-offset-2 hover:underline hover:text-font-default transition-colors"
        >
          Limpar tudo
        </button>
      )}
    </div>
  );
}
