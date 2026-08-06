"use client";

import { type ReactNode } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmptyAtom } from "@/components/atoms/feedback/empty";
import { ErrorAtom } from "@/components/atoms/feedback/error";
import { SkeletonTabelaMolecule } from "./skeleton-content.molecule";

export interface TabelaColuna {
  label: string;
  align?: "left" | "right" | "center";
  sortKey?: string;
}

interface TabelaMoleculeProps<T> {
  dados: T[];
  colunas: TabelaColuna[];
  carregando: boolean;
  erro: boolean;
  onRetry?: () => void;
  textoVazio?: string;
  acaoVazio?: { label: string; onClick: () => void };
  renderLinha: (item: T, idx: number) => ReactNode;
  onRowClick?: (item: T) => void;
  getKey: (item: T) => string | number;
  skeletonLinhas?: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  onSort?: (field: string, order: "asc" | "desc") => void;
}

const ALIGN: Record<string, string> = {
  left:   "text-left",
  right:  "text-right",
  center: "text-center",
};

function SortIcon({ active, order }: { active: boolean; order?: "asc" | "desc" }) {
  if (!active) return <ArrowUpDown size={12} className="shrink-0 opacity-40" />;
  return order === "asc"
    ? <ArrowUp size={12} className="shrink-0 text-primary-default" />
    : <ArrowDown size={12} className="shrink-0 text-primary-default" />;
}

export function TabelaMolecule<T>({
  dados,
  colunas,
  carregando,
  erro,
  onRetry,
  textoVazio,
  acaoVazio,
  renderLinha,
  onRowClick,
  getKey,
  skeletonLinhas = 8,
  sortField,
  sortOrder,
  onSort,
}: TabelaMoleculeProps<T>) {
  if (carregando) {
    return <SkeletonTabelaMolecule linhas={skeletonLinhas} colunas={colunas.length} />;
  }

  if (erro) {
    return (
      <div className="flex items-center justify-center py-16">
        <ErrorAtom
          title="Não foi possível carregar"
          message="Ocorreu um erro ao buscar os dados."
          onRetry={onRetry}
        />
      </div>
    );
  }

  if (dados.length === 0) {
    return <EmptyAtom title={textoVazio} action={acaoVazio} />;
  }

  function handleSort(key: string) {
    if (!onSort) return;
    const nextOrder = sortField === key && sortOrder === "asc" ? "desc" : "asc";
    onSort(key, nextOrder);
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-background-divisor">
          {colunas.map((col, i) => {
            const sortable = !!col.sortKey && !!onSort;
            const active = sortable && sortField === col.sortKey;
            return (
              <th
                key={i}
                onClick={sortable ? () => handleSort(col.sortKey!) : undefined}
                className={cn(
                  "px-4 py-3 text-xs font-semibold text-font-vector",
                  ALIGN[col.align ?? "left"],
                  sortable && "cursor-pointer select-none hover:text-font-default"
                )}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {sortable && <SortIcon active={active} order={active ? sortOrder : undefined} />}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {dados.map((item, idx) => (
          <tr
            key={getKey(item)}
            onClick={() => onRowClick?.(item)}
            className={cn(
              "transition-colors",
              onRowClick && "cursor-pointer hover:bg-background-hover",
              idx % 2 === 0 ? "bg-transparent" : "bg-background-divisor/30"
            )}
          >
            {renderLinha(item, idx)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
