"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MESES    = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const DIAS_SEM = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

function maskDate(v: string) {
  const n = v.replace(/\D/g, "").slice(0, 8);
  return n
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
}

function displayToISO(display: string): string {
  const [dd, mm, yyyy] = display.split("/");
  if (dd?.length === 2 && mm?.length === 2 && yyyy?.length === 4)
    return `${yyyy}-${mm}-${dd}`;
  return "";
}

function isoToDisplay(iso: string): string {
  if (!iso) return "";
  const [yyyy, mm, dd] = iso.split("-");
  return yyyy && mm && dd ? `${dd}/${mm}/${yyyy}` : "";
}

function toISO(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseISO(iso: string) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  return { year: y, month: m - 1, day: d };
}

function buildCells(year: number, month: number): (number | null)[] {
  const first = new Date(year, month, 1).getDay();
  const days  = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(first).fill(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

interface DateInputAtomProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  min?: string;
  className?: string;
}

export function DateInputAtom({
  value,
  onChange,
  placeholder = "DD/MM/AAAA",
  disabled,
  min,
  className,
}: DateInputAtomProps) {
  const today   = new Date();
  const sel     = parseISO(value);
  const minDate = parseISO(min ?? "");

  const [open, setOpen]           = useState(false);
  const [pos, setPos]             = useState({ top: 0, left: 0 });
  const [viewYear, setViewYear]   = useState(sel?.year  ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(sel?.month ?? today.getMonth());
  const [text, setText]           = useState(isoToDisplay(value));

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      const t = e.target as Node;
      if (!containerRef.current?.contains(t) && !dropdownRef.current?.contains(t)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  function handleToggle() {
    if (disabled) return;
    if (!open && containerRef.current) {
      const r = containerRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 6, left: r.left });
    }
    setOpen((o) => !o);
  }

  function handleTextChange(v: string) {
    const masked = maskDate(v);
    setText(masked);
    const iso = displayToISO(masked);
    if (iso) onChange(iso);
    else if (!masked) onChange("");
  }

  function handlePickerSelect(day: number) {
    if (isDisabledDay(day)) return;
    const iso = toISO(viewYear, viewMonth, day);
    onChange(iso);
    setText(isoToDisplay(iso));
    setOpen(false);
  }

  function isDisabledDay(day: number) {
    if (!minDate) return false;
    const a = viewYear * 10000 + viewMonth * 100 + day;
    const b = minDate.year * 10000 + minDate.month * 100 + minDate.day;
    return a < b;
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
    <div ref={containerRef} className={cn("inline-block", className)}>
      {/* Campo */}
      <div className={cn(
        "flex h-9 w-full items-center gap-1 rounded-lg border px-3 transition-colors",
        open ? "border-primary-default" : "border-background-stroke",
        "bg-background-default",
        disabled && "cursor-not-allowed opacity-60",
      )}>
        <input
          type="text"
          inputMode="numeric"
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={10}
          className="flex-1 min-w-0 bg-transparent text-sm text-font-default placeholder:text-font-vector outline-none disabled:cursor-not-allowed"
        />
        <button
          type="button"
          disabled={disabled}
          onClick={handleToggle}
          className="shrink-0 flex items-center justify-center cursor-pointer opacity-50 hover:opacity-100 transition-opacity disabled:cursor-not-allowed"
        >
          <CalendarDays size={14} className="text-font-vector" />
        </button>
      </div>

      {/* Calendário — portal para escapar de overflow-hidden */}
      {open && typeof window !== "undefined" && createPortal(
        <div
          ref={dropdownRef}
          className="w-68 rounded-2xl border p-4 shadow-xl"
          style={{
            position: "fixed",
            top: pos.top,
            left: pos.left,
            zIndex: 9999,
            pointerEvents: "auto",
            background: "var(--background-modal)",
            borderColor: "var(--background-divisor)",
          }}
        >
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
              const isDis = isDisabledDay(day);
              const isTod = today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day;
              return (
                <button key={i} type="button" disabled={isDis}
                  onClick={() => handlePickerSelect(day)}
                  className={cn(
                    "flex h-8 w-full items-center justify-center rounded-lg text-sm transition-colors",
                    isSel ? "font-semibold" : !isDis ? "cursor-pointer hover:bg-background-default" : "cursor-not-allowed opacity-30",
                    !isSel && isTod && "font-bold",
                  )}
                  style={{
                    background: isSel ? "var(--primary-default)" : isTod ? "rgba(170,126,143,0.12)" : "transparent",
                    color: isSel ? "#fff" : "var(--font-default)",
                  }}>{day}</button>
              );
            })}
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
