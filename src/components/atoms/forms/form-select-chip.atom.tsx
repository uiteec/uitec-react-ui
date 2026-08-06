"use client";

import { useEffect, useRef, useState } from "react";
import { Controller, type Control } from "react-hook-form";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChipOption {
  label: string;
  value: string | number;
}

interface FormSelectChipAtomProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  options: ChipOption[];
  disabled?: boolean;
  isInvalid?: boolean;
  onSelectionChange?: (values: (string | number)[]) => void;
  className?: string;
}

export function FormSelectChipAtom({
  control, name, placeholder = "Selecione...", options, disabled, isInvalid, onSelectionChange, className,
}: FormSelectChipAtomProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const selected: (string | number)[] = Array.isArray(field.value) ? field.value : [];

        const toggle = (val: string | number) => {
          const next = selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val];
          field.onChange(next);
          onSelectionChange?.(next);
          setOpen(false);
        };

        const remove = (val: string | number) => {
          const next = selected.filter((v) => v !== val);
          field.onChange(next);
          onSelectionChange?.(next);
        };

        const getLabel = (val: string | number) => options.find((o) => o.value === val)?.label ?? String(val);
        const available = options.filter((o) => !selected.includes(o.value));

        return (
          <div ref={ref} className={cn("flex flex-col gap-2", className)}>
            {/* Chips dos selecionados */}
            {selected.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {selected.map((val) => (
                  <span
                    key={val}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ background: "var(--primary-contrast)", color: "var(--primary-default)" }}
                  >
                    {getLabel(val)}
                    <button type="button" onClick={() => remove(val)} className="hover:opacity-70">
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Dropdown trigger */}
            <div className="relative">
              <button
                type="button"
                disabled={disabled || available.length === 0}
                onClick={() => !(disabled || available.length === 0) && setOpen((v) => !v)}
                className={cn(
                  "w-full h-10 pl-3 pr-9 rounded-lg text-sm text-left outline-none transition-all flex items-center",
                  (disabled || available.length === 0) && "opacity-60 cursor-not-allowed"
                )}
                style={{
                  background: disabled ? "var(--background-page)" : "var(--background-card)",
                  border: isInvalid ? "1.5px solid var(--error-300)" : "1.5px solid var(--background-stroke)",
                  color: "var(--font-vector)",
                }}
              >
                {available.length === 0 ? "Todos selecionados" : placeholder}
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--font-vector)" }} />
              </button>

              {open && (
                <div
                  className="absolute z-50 w-full mt-1 rounded-lg shadow-lg overflow-y-auto max-h-52"
                  style={{ background: "var(--background-modal)", border: "1.5px solid var(--background-stroke)" }}
                >
                  {available.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => toggle(opt.value)}
                      className="w-full text-left px-3 py-2.5 text-sm hover:opacity-80 transition-opacity"
                      style={{ color: "var(--font-default)" }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      }}
    />
  );
}
