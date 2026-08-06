"use client";

import { type ReactNode } from "react";
import { Controller, type Control } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormCheckboxAtomProps {
  control: Control<any>;
  name: string;
  labelItem?: string | ReactNode;
  disabled?: boolean;
  className?: string;
}

export function FormCheckboxAtom({
  control,
  name,
  labelItem,
  disabled,
  className,
}: FormCheckboxAtomProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <label
          className={cn(
            "flex items-center gap-2",
            disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
            className
          )}
        >
          <input
            type="checkbox"
            checked={!!field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            disabled={disabled}
            className="w-4 h-4 rounded"
            style={{ accentColor: "var(--primary-default)", cursor: disabled ? "not-allowed" : "pointer" }}
          />
          {labelItem && (
            <span className="text-sm select-none" style={{ color: "var(--font-default)" }}>
              {labelItem}
            </span>
          )}
        </label>
      )}
    />
  );
}
