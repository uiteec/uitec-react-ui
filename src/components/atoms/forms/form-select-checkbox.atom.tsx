"use client";

import { useEffect, useRef, useState } from "react";
import { Controller, type Control } from "react-hook-form";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxOption {
  label: string;
  value: string | number;
}

interface FormSelectCheckboxAtomProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  options: CheckboxOption[];
  disabled?: boolean;
  isInvalid?: boolean;
  onSelect?: (values: (string | number)[]) => void;
  className?: string;
}

export function FormSelectCheckboxAtom({
  control, name, placeholder = "Selecione...", options, disabled, isInvalid, onSelect, className,
}: FormSelectCheckboxAtomProps) {
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
          onSelect?.(next);
        };

        const clear = () => { field.onChange([]); onSelect?.([]); };

        const displayLabel = () => {
          if (!selected.length) return null;
          const labels = selected.map((v) => options.find((o) => o.value === v)?.label ?? "").filter(Boolean);
          const preview = labels.slice(0, 2).join(", ");
          return labels.length > 2 ? `${preview} +${labels.length - 2}` : preview;
        };

        return (
          <div ref={ref} className={cn("relative", className)}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => !disabled && setOpen((v) => !v)}
              className={cn(
                "w-full h-10 pl-3 pr-9 rounded-lg text-sm text-left outline-none transition-all flex items-center",
                disabled && "opacity-60 cursor-not-allowed"
              )}
              style={{
                background: disabled ? "var(--background-page)" : "var(--background-card)",
                border: isInvalid ? "1.5px solid var(--error-300)" : "1.5px solid var(--background-stroke)",
                color: selected.length ? "var(--font-default)" : "var(--font-vector)",
              }}
            >
              <span className="flex-1 truncate">{displayLabel() ?? placeholder}</span>

              {selected.length > 0 && (
                <span
                  onClick={(e) => { e.stopPropagation(); clear(); }}
                  className="absolute right-8 top-1/2 -translate-y-1/2 hover:opacity-70"
                  style={{ color: "var(--font-vector)" }}
                >
                  <X size={14} />
                </span>
              )}
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--font-vector)" }} />
            </button>

            {open && (
              <div
                className="absolute z-50 w-full mt-1 rounded-lg shadow-lg overflow-y-auto max-h-52"
                style={{ background: "var(--background-modal)", border: "1.5px solid var(--background-stroke)" }}
              >
                {options.map((opt) => {
                  const checked = selected.includes(opt.value);
                  return (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(opt.value)}
                        className="w-4 h-4 rounded"
                        style={{ accentColor: "var(--primary-default)" }}
                      />
                      <span className="text-sm" style={{ color: "var(--font-default)" }}>{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
