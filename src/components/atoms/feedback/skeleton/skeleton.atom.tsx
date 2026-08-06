"use client";

import { cn } from "@/lib/utils";

export type SkeletonVariant = "line" | "circle" | "rect";

interface SkeletonAtomProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
}

function SkeletonBase({ width, height, className }: { width?: string | number; height?: string | number; className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded", className)}
      style={{ width: width ?? "100%", height: height ?? 16, background: "var(--background-divisor)" }}
    />
  );
}

export function SkeletonAtom({ variant = "line", width, height, count = 1, className }: SkeletonAtomProps) {
  if (variant === "circle") {
    const size = width ?? height ?? 40;
    return (
      <div
        className={cn("animate-pulse rounded-full shrink-0", className)}
        style={{ width: size, height: size, background: "var(--background-divisor)" }}
      />
    );
  }

  if (variant === "rect") {
    return <SkeletonBase width={width ?? "100%"} height={height ?? 120} className={cn("rounded-xl", className)} />;
  }

  if (count === 1) {
    return <SkeletonBase width={width} height={height ?? 16} className={className} />;
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonBase
          key={i}
          width={i === count - 1 && count > 1 ? "60%" : (width ?? "100%")}
          height={height ?? 16}
        />
      ))}
    </div>
  );
}
