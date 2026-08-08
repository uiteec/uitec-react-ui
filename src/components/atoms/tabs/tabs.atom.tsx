"use client";

import { cn } from "@/lib/utils";

export interface TabItem {
  value: string;
  label: string;
}

interface TabsAtomProps {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TabsAtom({ tabs, value, onChange, className }: TabsAtomProps) {
  return (
    <div className={cn("flex items-center gap-1 border-b overflow-x-auto", className)} style={{ borderColor: "var(--background-divisor)" }}>
      {tabs.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={cn(
              "px-3 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors cursor-pointer",
              active ? "border-primary-default" : "border-transparent hover:text-font-default"
            )}
            style={{ color: active ? "var(--primary-default)" : "var(--font-vector)" }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
