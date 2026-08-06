"use client";

interface ScanLineAtomProps {
  ativo: boolean;
}

export function ScanLineAtom({ ativo }: ScanLineAtomProps) {
  if (!ativo) return null;

  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none" aria-hidden="true">
      <div
        className="app-scan-line absolute left-0 right-0 h-10"
        style={{
          background: "linear-gradient(180deg, transparent, var(--app-glow-cyan), transparent)",
          animation: "scan-sweep 1.8s ease-in-out infinite",
        }}
      />
    </div>
  );
}
