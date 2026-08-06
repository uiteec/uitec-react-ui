"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputAtomProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInputAtom({ value, onChange, placeholder = "Buscar…", className }: SearchInputAtomProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border border-background-stroke bg-background-default px-3 py-2",
        className
      )}
    >
      <Search size={15} className="shrink-0 text-font-vector" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-font-default outline-none"
      />
    </div>
  );
}
