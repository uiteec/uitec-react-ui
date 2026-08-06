"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsMoleculeProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export function BreadcrumbsMolecule({ items, showHome = true, className }: BreadcrumbsMoleculeProps) {
  const all: BreadcrumbItem[] = showHome ? [{ label: "Início", href: "/dashboard" }, ...items] : items;

  return (
    <nav aria-label="breadcrumb" className={cn("flex items-center gap-1", className)}>
      {all.map((item, i) => {
        const isLast = i === all.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {i === 0 && showHome ? (
              <Link
                href={item.href ?? "/dashboard"}
                className="flex items-center transition-opacity hover:opacity-80"
                style={{ color: "var(--font-vector)" }}
              >
                <Home size={12} />
              </Link>
            ) : isLast ? (
              <span className="text-xs font-medium" style={{ color: "var(--font-default)" }}>
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href ?? "#"}
                className="text-xs transition-opacity hover:opacity-80"
                style={{ color: "var(--font-vector)" }}
              >
                {item.label}
              </Link>
            )}

            {!isLast && (
              <ChevronRight size={12} style={{ color: "var(--font-vector)", opacity: 0.5 }} />
            )}
          </span>
        );
      })}
    </nav>
  );
}
