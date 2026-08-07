"use client";

import { Controller, type Control } from "react-hook-form";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

function maskCEP(v: string) {
  const n = v.replace(/\D/g, "").slice(0, 8);
  return n.replace(/(\d{5})(\d{1,3})$/, "$1-$2");
}

interface FormCEPAtomProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  onSearchPress?: () => void;
  className?: string;
}

export function FormCEPAtom({ control, name, placeholder = "_____-___", disabled, isInvalid, onSearchPress, className }: FormCEPAtomProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="relative">
          <input
            value={field.value ?? ""}
            onChange={(e) => field.onChange(maskCEP(e.target.value))}
            onBlur={field.onBlur}
            type="text"
            inputMode="numeric"
            placeholder={placeholder}
            disabled={disabled}
            maxLength={9}
            className={cn(
              "w-full h-10 px-3 rounded-lg text-sm outline-none transition-all",
              onSearchPress && "pr-10",
              disabled && "opacity-60 cursor-not-allowed",
              className
            )}
            style={{
              background: disabled ? "var(--background-page)" : "white",
              border: isInvalid ? "1.5px solid var(--error-300)" : "1.5px solid var(--background-stroke)",
              color: "var(--font-default)",
            }}
          />
          {onSearchPress && (
            <button
              type="button"
              onClick={onSearchPress}
              disabled={disabled}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
              style={{ color: "var(--primary-default)" }}
            >
              <Search size={16} />
            </button>
          )}
        </div>
      )}
    />
  );
}
