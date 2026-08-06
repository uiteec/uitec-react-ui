"use client";

import { Controller, type Control } from "react-hook-form";
import { cn } from "@/lib/utils";

function maskDate(v: string) {
  const n = v.replace(/\D/g, "").slice(0, 8);
  return n
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2");
}

function maskMonthYear(v: string) {
  const n = v.replace(/\D/g, "").slice(0, 6);
  return n.replace(/(\d{2})(\d{1,4})/, "$1/$2");
}

function displayToISO(display: string, monthAndYear?: boolean): string {
  if (monthAndYear) {
    const [mm, yyyy] = display.split("/");
    if (mm?.length === 2 && yyyy?.length === 4) return `${yyyy}-${mm}`;
    return display;
  }
  const [dd, mm, yyyy] = display.split("/");
  if (dd?.length === 2 && mm?.length === 2 && yyyy?.length === 4) return `${yyyy}-${mm}-${dd}`;
  return display;
}

function isoToDisplay(iso: string, monthAndYear?: boolean): string {
  if (!iso) return "";
  if (monthAndYear) {
    const [yyyy, mm] = iso.split("-");
    return yyyy && mm ? `${mm}/${yyyy}` : iso;
  }
  const [yyyy, mm, dd] = iso.split("-");
  return yyyy && mm && dd ? `${dd}/${mm}/${yyyy}` : iso;
}

interface FormDateAtomProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  monthAndYear?: boolean;
  className?: string;
}

export function FormDateAtom({ control, name, placeholder, disabled, isInvalid, monthAndYear = false, className }: FormDateAtomProps) {
  const defaultPlaceholder = monthAndYear ? "MM/AAAA" : "DD/MM/AAAA";

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const displayValue = isoToDisplay(field.value ?? "", monthAndYear);

        return (
          <input
            value={displayValue}
            onChange={(e) => {
              const masked = monthAndYear ? maskMonthYear(e.target.value) : maskDate(e.target.value);
              const iso = displayToISO(masked, monthAndYear);
              field.onChange(iso);
            }}
            onBlur={field.onBlur}
            type="text"
            inputMode="numeric"
            placeholder={placeholder ?? defaultPlaceholder}
            disabled={disabled}
            maxLength={monthAndYear ? 7 : 10}
            className={cn("w-full h-10 px-3 rounded-lg text-sm outline-none transition-all", disabled && "opacity-60 cursor-not-allowed", className)}
            style={{
              background: disabled ? "var(--background-page)" : "var(--background-card)",
              border: isInvalid ? "1.5px solid var(--error-300)" : "1.5px solid var(--background-stroke)",
              color: "var(--font-default)",
            }}
          />
        );
      }}
    />
  );
}
