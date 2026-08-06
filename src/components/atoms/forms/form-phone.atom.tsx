"use client";

import { Controller, type Control } from "react-hook-form";
import { cn } from "@/lib/utils";

function maskPhone(v: string) {
  const n = v.replace(/\D/g, "").slice(0, 11);
  if (n.length <= 10) {
    return n
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d{1,4})$/, "$1-$2");
  }
  return n
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
}

interface FormPhoneAtomProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  className?: string;
}

export function FormPhoneAtom({ control, name, placeholder = "(__) _____-____", disabled, isInvalid, className }: FormPhoneAtomProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <input
          value={field.value ?? ""}
          onChange={(e) => field.onChange(maskPhone(e.target.value))}
          onBlur={field.onBlur}
          type="text"
          inputMode="tel"
          placeholder={placeholder}
          disabled={disabled}
          maxLength={15}
          className={cn("w-full h-10 px-3 rounded-lg text-sm outline-none transition-all", disabled && "opacity-60 cursor-not-allowed", className)}
          style={{
            background: disabled ? "var(--background-page)" : "var(--background-card)",
            border: isInvalid ? "1.5px solid var(--error-300)" : "1.5px solid var(--background-stroke)",
            color: "var(--font-default)",
          }}
        />
      )}
    />
  );
}
