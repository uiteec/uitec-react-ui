"use client";

interface BrandCheckAtomProps {
  size?: number;
  label?: string;
  className?: string;
}

export function BrandCheckAtom({ size = 112, label = "Concluído", className }: BrandCheckAtomProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={className}
      style={{ width: size, height: size, position: "relative", flexShrink: 0 }}
    >
      <div
        className="absolute rounded-full"
        style={{
          inset: size * 0.1,
          background: "radial-gradient(circle at 35% 30%, var(--success-100), var(--success-300) 70%)",
          boxShadow: `0 0 ${size * 0.35}px ${size * 0.06}px var(--app-glow-success)`,
          animation: "app-check-pop 0.45s cubic-bezier(0.22, 1.5, 0.36, 1) both",
        }}
      />

      <svg
        viewBox="0 0 52 52"
        className="absolute"
        style={{ inset: size * 0.24 }}
        width={size * 0.52}
        height={size * 0.52}
      >
        <path
          d="M14 27 L22.5 35.5 L39 17"
          fill="none"
          stroke="var(--success-100)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1,
            animation: "app-check-draw 0.4s 0.35s ease-out forwards",
          }}
        />
      </svg>
    </div>
  );
}
