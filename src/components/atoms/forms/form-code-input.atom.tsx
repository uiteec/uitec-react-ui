"use client";

import { useRef } from "react";
import { Controller, type Control } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormCodeInputAtomProps {
  control: Control<any>;
  name: string;
  length?: number;
  disabled?: boolean;
  isInvalid?: boolean;
  className?: string;
}

export function FormCodeInputAtom({ control, name, length = 4, disabled, isInvalid, className }: FormCodeInputAtomProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const digits: string[] = Array.from({ length }, (_, i) => (field.value?.[i] ?? ""));

        const handleChange = (index: number, char: string) => {
          const digit = char.replace(/\D/g, "").slice(-1);
          const next = [...digits];
          next[index] = digit;
          field.onChange(next.join(""));
          if (digit && index < length - 1) inputsRef.current[index + 1]?.focus();
        };

        const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Backspace" && !digits[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
          }
        };

        const handlePaste = (e: React.ClipboardEvent) => {
          e.preventDefault();
          const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
          field.onChange(pasted.padEnd(length, "").slice(0, length));
          const focusIndex = Math.min(pasted.length, length - 1);
          inputsRef.current[focusIndex]?.focus();
        };

        return (
          <div className={cn("flex gap-2", className)}>
            {Array.from({ length }).map((_, i) => (
              <input
                key={i}
                ref={(el) => { inputsRef.current[i] = el; }}
                value={digits[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                type="text"
                inputMode="numeric"
                maxLength={1}
                disabled={disabled}
                className={cn(
                  "w-11 h-12 text-center rounded-lg text-base font-semibold outline-none transition-all",
                  disabled && "opacity-60 cursor-not-allowed"
                )}
                style={{
                  background: disabled ? "var(--background-page)" : "var(--background-card)",
                  border: isInvalid ? "1.5px solid var(--error-300)" : "1.5px solid var(--background-stroke)",
                  color: "var(--font-default)",
                }}
              />
            ))}
          </div>
        );
      }}
    />
  );
}
