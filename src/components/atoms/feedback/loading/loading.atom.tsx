"use client";

import { cn } from "@/lib/utils";

export type LoadingVariant = "spinner" | "dots" | "pulse";
export type LoadingSize    = "sm" | "md" | "lg";

interface LoadingAtomProps {
  variant?: LoadingVariant;
  size?: LoadingSize;
  label?: string;
  fullScreen?: boolean;
  className?: string;
}

const SPINNER_PX: Record<LoadingSize, number>  = { sm: 16, md: 24, lg: 36 };
const DOT_CLASS:  Record<LoadingSize, string>   = { sm: "w-1.5 h-1.5", md: "w-2 h-2", lg: "w-3 h-3" };

function Spinner({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="animate-spin" style={{ color: "var(--primary-default)" }}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.2" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Dots({ dotClass }: { dotClass: string }) {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn("rounded-full animate-bounce", dotClass)}
          style={{ background: "var(--primary-default)", animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

function Pulse({ size }: { size: number }) {
  return (
    <div
      className="rounded-full animate-pulse"
      style={{ width: size, height: size, background: "var(--primary-default)", opacity: 0.6 }}
    />
  );
}

export function LoadingAtom({ variant = "spinner", size = "md", label, fullScreen, className }: LoadingAtomProps) {
  const indicator =
    variant === "spinner" ? <Spinner size={SPINNER_PX[size]} /> :
    variant === "dots"    ? <Dots dotClass={DOT_CLASS[size]} /> :
                            <Pulse size={SPINNER_PX[size]} />;

  const inner = (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {indicator}
      {label && <p className="text-xs" style={{ color: "var(--font-vector)" }}>{label}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.3)" }}>
        <div className="rounded-2xl px-8 py-6" style={{ background: "var(--background-modal)" }}>
          {inner}
        </div>
      </div>
    );
  }

  return inner;
}
