"use client";

import { useState } from "react";
import { Controller, type Control } from "react-hook-form";
import * as Popover from "@radix-ui/react-popover";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MESES      = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const MESES_ABREV = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const DIAS_SEM   = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

// ─── helpers ──────────────────────────────────────────────────────────────────

function maskDate(v: string) {
  const n = v.replace(/\D/g, "").slice(0, 8);
  return n
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
}

function maskMonthYear(v: string) {
  const n = v.replace(/\D/g, "").slice(0, 6);
  return n.replace(/(\d{2})(\d{1,4})/, "$1/$2");
}

function displayToISO(display: string): string {
  const [dd, mm, yyyy] = display.split("/");
  if (dd?.length === 2 && mm?.length === 2 && yyyy?.length === 4)
    return `${yyyy}-${mm}-${dd}`;
  return "";
}

function displayToISOMonthYear(display: string): string {
  const [mm, yyyy] = display.split("/");
  if (mm?.length === 2 && yyyy?.length === 4) return `${yyyy}-${mm}`;
  return "";
}

function isoToDisplay(iso: string, monthAndYear: boolean): string {
  if (!iso) return "";
  const [yyyy, mm, dd] = iso.split("-");
  if (monthAndYear) return yyyy && mm ? `${mm}/${yyyy}` : "";
  return yyyy && mm && dd ? `${dd}/${mm}/${yyyy}` : "";
}

function toISO(year: number, month: number, day?: number): string {
  if (day === undefined) return `${year}-${String(month + 1).padStart(2, "0")}`;
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseISO(iso: string) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m) return null;
  return { year: y, month: m - 1, day: d ?? 1 };
}

function buildCells(year: number, month: number): (number | null)[] {
  const first = new Date(year, month, 1).getDay();
  const days  = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(first).fill(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

// ─── CalendarField (date picker com input editável) ──────────────────────────

function CalendarField({ value, onChange, isInvalid, disabled, placeholder }: {
  value: string; onChange: (v: string) => void;
  isInvalid?: boolean; disabled?: boolean; placeholder?: string;
}) {
  const today = new Date();
  const sel   = parseISO(value);
  const [open, setOpen]           = useState(false);
  const [viewYear, setViewYear]   = useState(sel?.year  ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(sel?.month ?? today.getMonth());
  const [text, setText]           = useState(isoToDisplay(value, false));

  function handleText(v: string) {
    const masked = maskDate(v);
    setText(masked);
    const iso = displayToISO(masked);
    if (iso) onChange(iso);
    else if (!masked) onChange("");
  }

  function handleSelect(day: number) {
    const iso = toISO(viewYear, viewMonth, day);
    onChange(iso);
    setText(isoToDisplay(iso, false));
    setOpen(false);
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  }

  const cells = buildCells(viewYear, viewMonth);

  return (
    <Popover.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
      <div className={cn(
        "flex h-10 w-full items-center gap-1 rounded-lg border px-3 transition-colors focus-within:border-primary-default",
        isInvalid ? "border-error-300" : "border-background-stroke",
        "bg-background-default",
        disabled && "cursor-not-allowed opacity-60",
      )}>
        <input
          type="text"
          inputMode="numeric"
          value={text}
          onChange={(e) => handleText(e.target.value)}
          placeholder={placeholder ?? "DD/MM/AAAA"}
          disabled={disabled}
          maxLength={10}
          className="flex-1 bg-transparent text-sm text-font-default placeholder:text-font-vector outline-none disabled:cursor-not-allowed"
        />
        <Popover.Trigger
          type="button"
          disabled={disabled}
          className="shrink-0 flex items-center justify-center cursor-pointer opacity-50 hover:opacity-100 transition-opacity disabled:cursor-not-allowed"
        >
          <CalendarDays size={14} className="text-font-vector" />
        </Popover.Trigger>
      </div>

      <Popover.Portal>
        <Popover.Content align="start" sideOffset={6}
          className="z-50 w-68 rounded-2xl border p-4 shadow-xl outline-none"
          style={{ background: "var(--background-modal)", borderColor: "var(--background-divisor)" }}>

          <div className="mb-3 flex items-center justify-between">
            <button type="button" onClick={prevMonth}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-background-default">
              <ChevronLeft size={15} style={{ color: "var(--font-default)" }} />
            </button>
            <span className="text-sm font-semibold" style={{ color: "var(--font-default)" }}>
              {MESES[viewMonth]} {viewYear}
            </span>
            <button type="button" onClick={nextMonth}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-background-default">
              <ChevronRight size={15} style={{ color: "var(--font-default)" }} />
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7">
            {DIAS_SEM.map((d) => (
              <div key={d} className="flex h-7 items-center justify-center text-xs font-semibold"
                style={{ color: "var(--font-vector)" }}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-0.5">
            {cells.map((day, i) => {
              if (!day) return <div key={i} className="h-8" />;
              const isSel = !!sel && sel.year === viewYear && sel.month === viewMonth && sel.day === day;
              const isTod = today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day;
              return (
                <button key={i} type="button" onClick={() => handleSelect(day)}
                  className={cn(
                    "flex h-8 w-full items-center justify-center rounded-lg text-sm transition-colors cursor-pointer",
                    isSel ? "font-semibold" : "hover:bg-background-default",
                    !isSel && isTod && "font-bold",
                  )}
                  style={{
                    background: isSel ? "var(--primary-default)" : isTod ? "rgba(170,126,143,0.12)" : "transparent",
                    color: isSel ? "#fff" : "var(--font-default)",
                  }}>{day}</button>
              );
            })}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

// ─── MonthYearField ───────────────────────────────────────────────────────────

function MonthYearField({ value, onChange, isInvalid, disabled, placeholder }: {
  value: string; onChange: (v: string) => void;
  isInvalid?: boolean; disabled?: boolean; placeholder?: string;
}) {
  const today = new Date();
  const sel   = parseISO(value ? `${value}-01` : "");
  const [open, setOpen]         = useState(false);
  const [viewYear, setViewYear] = useState(sel?.year ?? today.getFullYear());
  const [text, setText]         = useState(isoToDisplay(value, true));

  function handleText(v: string) {
    const masked = maskMonthYear(v);
    setText(masked);
    const iso = displayToISOMonthYear(masked);
    if (iso) onChange(iso);
    else if (!masked) onChange("");
  }

  function handleSelect(idx: number) {
    const iso = toISO(viewYear, idx);
    onChange(iso);
    setText(isoToDisplay(iso, true));
    setOpen(false);
  }

  return (
    <Popover.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
      <div className={cn(
        "flex h-10 w-full items-center gap-1 rounded-lg border px-3 transition-colors focus-within:border-primary-default",
        isInvalid ? "border-error-300" : "border-background-stroke",
        "bg-background-default",
        disabled && "cursor-not-allowed opacity-60",
      )}>
        <input
          type="text"
          inputMode="numeric"
          value={text}
          onChange={(e) => handleText(e.target.value)}
          placeholder={placeholder ?? "MM/AAAA"}
          disabled={disabled}
          maxLength={7}
          className="flex-1 bg-transparent text-sm text-font-default placeholder:text-font-vector outline-none disabled:cursor-not-allowed"
        />
        <Popover.Trigger
          type="button"
          disabled={disabled}
          className="shrink-0 flex items-center justify-center cursor-pointer opacity-50 hover:opacity-100 transition-opacity disabled:cursor-not-allowed"
        >
          <CalendarDays size={14} className="text-font-vector" />
        </Popover.Trigger>
      </div>

      <Popover.Portal>
        <Popover.Content align="start" sideOffset={6}
          className="z-50 w-64 rounded-2xl border p-4 shadow-xl outline-none"
          style={{ background: "var(--background-modal)", borderColor: "var(--background-divisor)" }}>

          <div className="mb-3 flex items-center justify-between">
            <button type="button" onClick={() => setViewYear((y) => y - 1)}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-background-default">
              <ChevronLeft size={15} style={{ color: "var(--font-default)" }} />
            </button>
            <span className="text-sm font-semibold" style={{ color: "var(--font-default)" }}>{viewYear}</span>
            <button type="button" onClick={() => setViewYear((y) => y + 1)}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-background-default">
              <ChevronRight size={15} style={{ color: "var(--font-default)" }} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {MESES_ABREV.map((mes, idx) => {
              const isSel = !!sel && sel.year === viewYear && sel.month === idx;
              return (
                <button key={mes} type="button" onClick={() => handleSelect(idx)}
                  className={cn("rounded-lg py-2 text-xs font-medium transition-colors cursor-pointer",
                    !isSel && "hover:bg-background-default")}
                  style={{
                    background: isSel ? "var(--primary-default)" : "transparent",
                    color: isSel ? "#fff" : "var(--font-default)",
                  }}>{mes}</button>
              );
            })}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

// ─── export ───────────────────────────────────────────────────────────────────

interface FormDateAtomProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  monthAndYear?: boolean;
  className?: string;
}

export function FormDateAtom({ control, name, placeholder, disabled, isInvalid, monthAndYear = false }: FormDateAtomProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) =>
        monthAndYear ? (
          <MonthYearField
            value={field.value ?? ""}
            onChange={field.onChange}
            isInvalid={isInvalid}
            disabled={disabled}
            placeholder={placeholder}
          />
        ) : (
          <CalendarField
            value={field.value ?? ""}
            onChange={field.onChange}
            isInvalid={isInvalid}
            disabled={disabled}
            placeholder={placeholder}
          />
        )
      }
    />
  );
}
