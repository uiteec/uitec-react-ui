"use client";

import { Controller, type Control } from "react-hook-form";
import { cn } from "@/lib/utils";

export interface RadioOption {
  label: string;
  value: string | number;
}

interface FormRadioAtomProps {
  control: Control<any>;
  name: string;
  options: RadioOption[];
  disabled?: boolean;
  inline?: boolean;
  className?: string;
}

export function FormRadioAtom({
  control,
  name,
  options,
  disabled,
  inline = false,
  className,
}: FormRadioAtomProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={cn(inline ? "flex flex-row flex-wrap gap-4" : "flex flex-col gap-2", className)}>
          {options.map((opt) => (
            <label
              key={opt.value}
              className={cn(
                "flex items-center gap-2",
                disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
              )}
            >
              <input
                type="radio"
                value={opt.value}
                checked={field.value === opt.value}
                onChange={() => field.onChange(opt.value)}
                disabled={disabled}
                className="w-4 h-4"
                style={{ accentColor: "var(--primary-default)", cursor: disabled ? "not-allowed" : "pointer" }}
              />
              <span className="text-sm select-none" style={{ color: "var(--font-default)" }}>
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      )}
    />
  );
}
