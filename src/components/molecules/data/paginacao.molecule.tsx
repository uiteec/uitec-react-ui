"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginacaoMoleculeProps {
  page: number;
  pageSize?: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  className?: string;
}

export const PAGE_SIZE_PADRAO = 10;
const DEFAULT_PAGE_SIZE_OPTIONS = [PAGE_SIZE_PADRAO, 20, 50, 100];

function getPageNumbers(page: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  if (page <= 3) {
    return [0, 1, 2, 3, 4, "...", totalPages - 1];
  }

  if (page >= totalPages - 4) {
    return [0, "...", totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1];
  }

  return [0, "...", page - 1, page, page + 1, "...", totalPages - 1];
}

export function PaginacaoMolecule({
  page,
  pageSize = PAGE_SIZE_PADRAO,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  className,
}: PaginacaoMoleculeProps) {
  const totalPages = Math.ceil(total / pageSize);
  const from = page * pageSize + 1;
  const to   = Math.min((page + 1) * pageSize, total);
  const pages = getPageNumbers(page, totalPages);

  const navBtnClass = cn(
    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
  );

  return (
    <div className={cn("flex items-center justify-between gap-4 flex-wrap", className)}>
      <p className="text-sm shrink-0" style={{ color: "var(--font-vector)" }}>
        Mostrando {from}–{to} de {total} registros
      </p>

      <div className="flex items-center gap-3 ml-auto">
        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm shrink-0" style={{ color: "var(--font-vector)" }}>
              Itens por página
            </span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="text-sm rounded-lg px-2 py-1 border outline-none cursor-pointer"
              style={{
                color:       "var(--font-default)",
                background:  "var(--background-modal)",
                borderColor: "var(--background-stroke)",
              }}
            >
              {pageSizeOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 0}
              className={cn(navBtnClass, page === 0 ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:bg-background-divisor")}
              style={{ color: "var(--font-default)" }}
            >
              <ChevronLeft size={16} />
            </button>

            {pages.map((p, i) =>
              p === "..." ? (
                <span
                  key={`ellipsis-${i}`}
                  className="w-8 h-8 flex items-center justify-center text-sm select-none"
                  style={{ color: "var(--font-vector)" }}
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => p !== page && onPageChange(p as number)}
                  className={cn(
                    navBtnClass,
                    "text-sm font-medium",
                    p === page ? "cursor-default" : "cursor-pointer hover:bg-background-divisor"
                  )}
                  style={
                    p === page
                      ? { background: "var(--primary-default)", color: "var(--primary-contrast)" }
                      : { color: "var(--font-default)" }
                  }
                >
                  {(p as number) + 1}
                </button>
              )
            )}

            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages - 1}
              className={cn(navBtnClass, page === totalPages - 1 ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:bg-background-divisor")}
              style={{ color: "var(--font-default)" }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
