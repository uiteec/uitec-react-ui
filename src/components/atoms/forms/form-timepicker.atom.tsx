"use client";

import { useEffect, useRef, useState } from "react";
import { Controller, type Control } from "react-hook-form";
import * as Popover from "@radix-ui/react-popover";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const HOURS   = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));

function maskTime(v: string) {
  const n = v.replace(/\D/g, "").slice(0, 4);
  const hh = n.slice(0, 2);
  const mm = n.slice(2, 4);
  return mm.length ? `${hh}:${mm}` : hh;
}

function isValidTime(v: string) {
  const [hh, mm] = v.split(":");
  if (!hh || !mm || hh.length !== 2 || mm.length !== 2) return false;
  return parseInt(hh) <= 23 && parseInt(mm) <= 59;
}

function TimeField({ value, onChange, isInvalid, disabled, placeholder }: {
  value: string; onChange: (v: string) => void;
  isInvalid?: boolean; disabled?: boolean; placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(value);
  const [hh, mm]        = value ? value.split(":") : ["", ""];

  const hoursRef   = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const scrollTo = (ref: React.RefObject<HTMLDivElement | null>, idx: number) => {
      const item = ref.current?.children[idx] as HTMLElement | undefined;
      item?.scrollIntoView({ block: "center" });
    };
    setTimeout(() => {
      scrollTo(hoursRef,   hh ? parseInt(hh)                : 0);
      scrollTo(minutesRef, mm ? Math.round(parseInt(mm) / 5) : 0);
    }, 0);
  }, [open]);

  function handleText(v: string) {
    const masked = maskTime(v);
    setText(masked);
    if (isValidTime(masked)) onChange(masked);
    else if (!masked) onChange("");
  }

  function setHour(h: string) {
    const next = `${h}:${mm || "00"}`;
    onChange(next);
    setText(next);
  }

  function setMinute(m: string) {
    const next = `${hh || "00"}:${m}`;
    onChange(next);
    setText(next);
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
          placeholder={placeholder ?? "HH:MM"}
          disabled={disabled}
          maxLength={5}
          className="flex-1 bg-transparent text-sm text-font-default placeholder:text-font-vector outline-none disabled:cursor-not-allowed"
        />
        <Popover.Trigger
          type="button"
          disabled={disabled}
          className="shrink-0 flex items-center justify-center cursor-pointer opacity-50 hover:opacity-100 transition-opacity disabled:cursor-not-allowed"
        >
          <Clock size={14} className="text-font-vector" />
        </Popover.Trigger>
      </div>

      <Popover.Portal>
        <Popover.Content align="start" sideOffset={6}
          className="z-50 rounded-2xl border shadow-xl outline-none overflow-hidden"
          style={{ background: "var(--background-modal)", borderColor: "var(--background-divisor)" }}>

          <div className="px-4 pt-4 pb-2 border-b" style={{ borderColor: "var(--background-divisor)" }}>
            <p className="text-xs font-semibold" style={{ color: "var(--font-vector)" }}>Selecione o horário</p>
            <p className="text-lg font-bold mt-0.5 tracking-widest" style={{ color: "var(--primary-default)" }}>
              {hh || "00"}:{mm || "00"}
            </p>
          </div>

          <div className="flex" style={{ height: "200px" }}>
            <div className="flex flex-col items-center border-r" style={{ borderColor: "var(--background-divisor)", width: "72px" }}>
              <p className="text-xs font-semibold py-1.5 shrink-0" style={{ color: "var(--font-vector)" }}>Hora</p>
              <div ref={hoursRef} className="flex-1 overflow-y-auto w-full px-2 pb-2 scroll-smooth"
                style={{ scrollbarWidth: "none" }}>
                {HOURS.map((h) => (
                  <button key={h} type="button" onClick={() => setHour(h)}
                    className={cn("w-full rounded-lg py-1.5 text-sm font-medium transition-colors cursor-pointer",
                      hh !== h && "hover:bg-background-default")}
                    style={{
                      background: hh === h ? "var(--primary-default)" : "transparent",
                      color:      hh === h ? "#fff" : "var(--font-default)",
                    }}>{h}</button>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center" style={{ width: "72px" }}>
              <p className="text-xs font-semibold py-1.5 shrink-0" style={{ color: "var(--font-vector)" }}>Min</p>
              <div ref={minutesRef} className="flex-1 overflow-y-auto w-full px-2 pb-2 scroll-smooth"
                style={{ scrollbarWidth: "none" }}>
                {MINUTES.map((m) => (
                  <button key={m} type="button" onClick={() => setMinute(m)}
                    className={cn("w-full rounded-lg py-1.5 text-sm font-medium transition-colors cursor-pointer",
                      mm !== m && "hover:bg-background-default")}
                    style={{
                      background: mm === m ? "var(--primary-default)" : "transparent",
                      color:      mm === m ? "#fff" : "var(--font-default)",
                    }}>{m}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="px-4 py-3 border-t" style={{ borderColor: "var(--background-divisor)" }}>
            <button type="button" onClick={() => setOpen(false)}
              className="w-full rounded-lg py-2 text-xs font-semibold cursor-pointer transition-colors hover:opacity-85"
              style={{ background: "var(--primary-default)", color: "#fff" }}>
              Confirmar
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

interface FormTimepickerAtomProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  className?: string;
}

export function FormTimepickerAtom({ control, name, placeholder, disabled, isInvalid }: FormTimepickerAtomProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TimeField
          value={field.value ?? ""}
          onChange={field.onChange}
          isInvalid={isInvalid}
          disabled={disabled}
          placeholder={placeholder}
        />
      )}
    />
  );
}
