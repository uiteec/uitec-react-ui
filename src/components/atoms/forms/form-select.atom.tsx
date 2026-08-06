"use client";

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
  placeholder,
  options,
  disabled,
  isInvalid,
  className,
}: FormSelectAtomProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="relative">
          <select
            {...field}
            value={field.value ?? ""}
            disabled={disabled}
            className={cn(
              "w-full h-10 pl-3 pr-9 rounded-lg text-sm outline-none appearance-none transition-all",
              disabled && "opacity-60 cursor-not-allowed",
              className
            )}
            style={{
              background: disabled ? "var(--background-page)" : "var(--background-card)",
              border: isInvalid
                ? "1.5px solid var(--error-300)"
                : "1.5px solid var(--background-stroke)",
              color: field.value !== "" && field.value != null
                ? "var(--font-default)"
                : "var(--font-vector)",
            }}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} style={{ color: "var(--font-default)" }}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--font-vector)" }}
          />
        </div>
      )}
    />
  );
}
