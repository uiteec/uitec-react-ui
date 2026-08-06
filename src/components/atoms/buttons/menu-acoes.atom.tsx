"use client";

import { MoreHorizontal, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export interface MenuAcaoItem {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  variant?: "default" | "danger";
  disabled?: boolean;
}

interface MenuAcoesAtomProps {
  itens: MenuAcaoItem[];
  className?: string;
}

export function MenuAcoesAtom({ itens, className }: MenuAcoesAtomProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-font-vector transition-colors hover:bg-background-hover hover:text-font-default",
            className
          )}
        >
          <MoreHorizontal size={15} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={4} className="w-44 p-1">
        {itens.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              disabled={item.disabled}
              onClick={item.onClick}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                item.variant === "danger"
                  ? "text-error-300 hover:bg-error-100 disabled:opacity-40"
                  : "text-font-default hover:bg-background-hover disabled:opacity-40"
              )}
            >
              {Icon && <Icon size={14} className="shrink-0" />}
              {item.label}
            </button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
