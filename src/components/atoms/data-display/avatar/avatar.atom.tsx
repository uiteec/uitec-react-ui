"use client";

import { cn } from "@/lib/utils";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export type AvatarShape = "circle" | "square";

interface AvatarAtomProps {
  src?: string;
  name?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  online?: boolean;
  className?: string;
}

const SIZE_MAP: Record<AvatarSize, { px: number; text: string; dot: string }> = {
  xs: { px: 24, text: "text-[10px]", dot: "w-1.5 h-1.5" },
  sm: { px: 32, text: "text-xs",     dot: "w-2 h-2" },
  md: { px: 40, text: "text-sm",     dot: "w-2.5 h-2.5" },
  lg: { px: 48, text: "text-base",   dot: "w-3 h-3" },
  xl: { px: 64, text: "text-xl",     dot: "w-3.5 h-3.5" },
};

function getInitials(name?: string): string {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function AvatarAtom({ src, name, size = "md", shape = "circle", online, className }: AvatarAtomProps) {
  const { px, text, dot } = SIZE_MAP[size];
  const rounded = shape === "square" ? "rounded-lg" : "rounded-full";
  return (
    <div className={cn("relative inline-flex shrink-0", rounded, className)}>
      <div
        className={cn("overflow-hidden flex items-center justify-center font-semibold", rounded, text)}
        style={{ width: px, height: px, background: "var(--primary-contrast)", color: "var(--primary-default)" }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={name ?? "avatar"} className="w-full h-full object-cover" />
        ) : (
          getInitials(name)
        )}
      </div>
      {online !== undefined && (
        <span
          className={cn("absolute bottom-0 right-0 rounded-full border-2", dot)}
          style={{ background: online ? "#22c55e" : "#94a3b8", borderColor: "var(--background-modal)" }}
        />
      )}
    </div>
  );
}
