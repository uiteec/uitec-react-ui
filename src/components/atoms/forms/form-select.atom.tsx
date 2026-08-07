"use client";

import { useEffect, useRef, useState } from "react";
import { Controller, type Control } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string | number;
}

interface FormSelectAtomProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
  isInvalid?: boolean;
  className?: string;
}

export function FormSelectAtom({
  control,
  name,
  placeholder = "Selecione...",
  options,
  disabled,
  isInvalid,
  className,
}: FormSelectAtomProps) {
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
        const selectedOption = options.find((opt) => opt.value === field.value);

        const select = (val: string | number) => {
          field.onChange(val);
          setOpen(false);
        };

        return (
          <div ref={ref} className={cn("relative", className)}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => !disabled && setOpen((v) => !v)}
              className={cn(
                "w-full h-10 pl-3 pr-9 rounded-lg text-sm text-left outline-none transition-all",
                disabled && "opacity-60 cursor-not-allowed"
              )}
              style={{
                background: disabled ? "var(--background-page)" : "var(--background-card)",
                border: isInvalid
                  ? "1.5px solid var(--error-300)"
                  : "1.5px solid var(--background-stroke)",
                color: selectedOption ? "var(--font-default)" : "var(--font-vector)",
              }}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </button>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--font-vector)" }}
            />

            {open && (
              <div
                className="absolute z-50 w-full mt-1 rounded-lg shadow-lg overflow-y-auto max-h-52"
                style={{ background: "var(--background-modal)", border: "1.5px solid var(--background-stroke)" }}
              >
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => select(opt.value)}
                    className="w-full text-left px-3 py-2.5 text-sm hover:opacity-80 transition-opacity"
                    style={{ color: "var(--font-default)" }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
