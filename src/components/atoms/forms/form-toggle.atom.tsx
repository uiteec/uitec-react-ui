"use client";

import { type ReactNode } from "react";
import { Controller, type Control } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormToggleAtomProps {
  control: Control<any>;
  name: string;
  labelItem?: string | ReactNode;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function FormToggleAtom({
  control,
  name,
  labelItem,
  description,
  disabled,
  className,
}: FormToggleAtomProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={cn("flex items-start gap-3", className)}>
          <button
            type="button"
            role="switch"
            aria-checked={!!field.value}
            disabled={disabled}
            onClick={() => !disabled && field.onChange(!field.value)}
            className={cn(
              "relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200",
              disabled && "opacity-60 cursor-not-allowed"
            )}
            style={{
              background: field.value ? "var(--primary-default)" : "var(--background-stroke)",
              cursor: disabled ? "not-allowed" : "pointer",
            }}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200",
                field.value ? "translate-x-4" : "translate-x-0"
              )}
            />
          </button>
          {(labelItem || description) && (
            <div className="flex flex-col gap-0.5">
              {labelItem && (
                <span className="text-sm font-medium leading-none" style={{ color: "var(--font-default)" }}>
                  {labelItem}
                </span>
              )}
              {description && (
                <span className="text-xs mt-0.5" style={{ color: "var(--font-vector)" }}>
                  {description}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    />
  );
}
