"use client";

import { Controller, type Control } from "react-hook-form";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

function maskDate(v: string) {
  const n = v.replace(/\D/g, "").slice(0, 8);
  return n
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2");
}

function displayToISO(display: string): string {
  const [dd, mm, yyyy] = display.split("/");
  if (dd?.length === 2 && mm?.length === 2 && yyyy?.length === 4) return `${yyyy}-${mm}-${dd}`;
  return display;
}

function isoToDisplay(iso: string): string {
  if (!iso) return "";
  const [yyyy, mm, dd] = iso.split("-");
  return yyyy && mm && dd ? `${dd}/${mm}/${yyyy}` : iso;
}

export interface DateRangeValue {
  startDate?: string;
  endDate?: string;
}

interface FormDateRangeAtomProps {
  control: Control<any>;
  name: string;
  disabled?: boolean;
  isInvalid?: boolean;
  className?: string;
}

export function FormDateRangeAtom({ control, name, disabled, isInvalid, className }: FormDateRangeAtomProps) {
  const inputStyle = (invalid: boolean) => ({
    background: disabled ? "var(--background-page)" : "var(--background-card)",
    border: invalid ? "1.5px solid var(--error-300)" : "1.5px solid var(--background-stroke)",
    color: "var(--font-default)",
  });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const value: DateRangeValue = field.value ?? {};

        const update = (key: "startDate" | "endDate", raw: string) => {
          const masked = maskDate(raw);
          const iso = displayToISO(masked);
          field.onChange({ ...value, [key]: iso });
        };

        return (
          <div className={cn("flex items-center gap-2", className)}>
            <div className="relative flex-1">
              <CalendarDays size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--font-vector)" }} />
              <input
                value={isoToDisplay(value.startDate ?? "")}
                onChange={(e) => update("startDate", e.target.value)}
                type="text"
                inputMode="numeric"
                placeholder="DD/MM/AAAA"
                disabled={disabled}
                maxLength={10}
                className={cn("w-full h-10 pl-8 pr-3 rounded-lg text-sm outline-none transition-all", disabled && "opacity-60 cursor-not-allowed")}
                style={inputStyle(!!isInvalid)}
              />
            </div>

            <span className="text-sm flex-shrink-0" style={{ color: "var(--font-vector)" }}>até</span>

            <div className="relative flex-1">
              <CalendarDays size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--font-vector)" }} />
              <input
                value={isoToDisplay(value.endDate ?? "")}
                onChange={(e) => update("endDate", e.target.value)}
                type="text"
                inputMode="numeric"
                placeholder="DD/MM/AAAA"
                disabled={disabled}
                maxLength={10}
                className={cn("w-full h-10 pl-8 pr-3 rounded-lg text-sm outline-none transition-all", disabled && "opacity-60 cursor-not-allowed")}
                style={inputStyle(!!isInvalid)}
              />
            </div>
          </div>
        );
      }}
    />
  );
}
