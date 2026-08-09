"use client";

import { cn } from "@/lib/utils";

export type BrandOrbEstado = "idle" | "pensando" | "sucesso" | "erro";

interface BrandOrbAtomProps {
  estado?: BrandOrbEstado;
  size?: number;
  label?: string;
  className?: string;
}

// Toda cor/velocidade varia por estado, mas o movimento (respiração + giros + pulsos) nunca para —
// um orbe parado passa a sensação de painel travado, não de IA trabalhando.
const RESPIRACAO_POR_ESTADO: Record<BrandOrbEstado, string> = {
  idle: "app-breathe 4s ease-in-out infinite",
  pensando: "app-breathe 1.5s ease-in-out infinite",
  sucesso: "app-breathe 3s ease-in-out infinite",
  erro: "app-breathe 2.2s ease-in-out infinite",
};

const GIRO_ANEL_POR_ESTADO: Record<BrandOrbEstado, string> = {
  idle: "10s",
  pensando: "1.8s",
  sucesso: "6s",
  erro: "3.5s",
};

const GIRO_CIRCUITO_POR_ESTADO: Record<BrandOrbEstado, string> = {
  idle: "7s",
  pensando: "1.2s",
  sucesso: "4.5s",
  erro: "2.6s",
};

const GIRO_ORBITA_POR_ESTADO: Record<BrandOrbEstado, string> = {
  idle: "6s",
  pensando: "2.4s",
  sucesso: "5s",
  erro: "3s",
};

const CORES_ANEL_POR_ESTADO: Record<BrandOrbEstado, [string, string]> = {
  idle: ["var(--app-orb-ring-a)", "var(--app-orb-ring-b)"],
  pensando: ["var(--app-orb-ring-a)", "var(--app-orb-ring-b)"],
  sucesso: ["var(--success-300)", "var(--app-orb-ring-a)"],
  erro: ["var(--error-300)", "var(--app-orb-ring-a)"],
};

const GLOW_PING_POR_ESTADO: Record<BrandOrbEstado, string> = {
  idle: "var(--app-glow-purple)",
  pensando: "var(--app-glow-cyan)",
  sucesso: "var(--app-glow-success)",
  erro: "var(--app-glow-error)",
};

export function BrandOrbAtom({ estado = "idle", size = 72, label, className }: BrandOrbAtomProps) {
  const [corA, corB] = CORES_ANEL_POR_ESTADO[estado];
  const pensando = estado === "pensando";

  return (
    <div
      role="img"
      aria-label={label ?? (pensando ? "Analisando" : estado)}
      className={cn("app-orb relative shrink-0", className)}
      style={{ width: size, height: size }}
    >
      {/* pulsos de radar — expandem e desaparecem, indicando processamento ativo */}
      <div className="absolute" style={{ inset: -size * 0.18 }}>
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `1.5px solid ${GLOW_PING_POR_ESTADO[estado]}`,
            animation: `app-ping ${pensando ? "1.6s" : "3.2s"} ease-out infinite`,
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `1.5px solid ${GLOW_PING_POR_ESTADO[estado]}`,
            animation: `app-ping ${pensando ? "1.6s" : "3.2s"} ease-out infinite`,
            animationDelay: pensando ? "0.55s" : "1.1s",
          }}
        />
      </div>

      {/* pontos orbitando — sensação de partículas de processamento girando ao redor do núcleo */}
      <div
        className="absolute inset-0"
        style={{ animation: `app-think-spin ${GIRO_ORBITA_POR_ESTADO[estado]} linear infinite` }}
      >
        {[0, 120, 240].map((angulo, indice) => (
          <span
            key={angulo}
            className="absolute rounded-full"
            style={{
              width: Math.max(3, size * 0.06),
              height: Math.max(3, size * 0.06),
              background: indice % 2 === 0 ? corA : corB,
              top: "50%",
              left: "50%",
              transform: `rotate(${angulo}deg) translate(${size * 0.56}px) rotate(-${angulo}deg)`,
              animation: `app-orbit-dot ${pensando ? "1.4s" : "3s"} ease-in-out infinite`,
              animationDelay: `${indice * 0.2}s`,
              boxShadow: `0 0 6px 1px ${corA}`,
            }}
          />
        ))}
      </div>

      <div style={{ animation: RESPIRACAO_POR_ESTADO[estado] }} className="absolute inset-0">
        {/* anel externo giratório — sempre em movimento, muda de cor/velocidade por estado */}
        <div
          className="absolute inset-0 rounded-full transition-[background] duration-500"
          style={{
            background: `conic-gradient(from 0deg, ${corA}, ${corB}, ${corA})`,
            animation: `app-think-spin ${GIRO_ANEL_POR_ESTADO[estado]} linear infinite`,
          }}
        />

        {/* anel de "circuito" — segmentado, gira ao contrário do anel externo, dá textura tech */}
        <div
          className="absolute rounded-full"
          style={{
            inset: size * 0.06,
            background: `repeating-conic-gradient(from 0deg, transparent 0deg 14deg, rgba(255,255,255,0.45) 14deg 17deg)`,
            animation: `app-spin-reverse ${GIRO_CIRCUITO_POR_ESTADO[estado]} linear infinite`,
            opacity: 0.5,
            maskImage: "radial-gradient(circle, transparent 55%, black 58%)",
            WebkitMaskImage: "radial-gradient(circle, transparent 55%, black 58%)",
          }}
        />

        {/* núcleo */}
        <div
          className="absolute rounded-full"
          style={{
            inset: Math.max(4, size * 0.14),
            background: `radial-gradient(circle at 35% 30%, var(--app-orb-core), var(--primary-pastel) 55%, var(--primary-default) 100%)`,
            boxShadow: `0 0 ${size * 0.4}px ${size * 0.08}px var(--app-glow-purple)`,
          }}
        />

        {/* brilho interno pulsante — sempre ativo, mais rápido enquanto pensando */}
        <div
          className="absolute rounded-full"
          style={{
            inset: Math.max(8, size * 0.26),
            background: "radial-gradient(circle, rgba(255,255,255,0.9), transparent 70%)",
            animation: `app-shimmer ${pensando ? "1.1s" : "2.6s"} ease-in-out infinite`,
          }}
        />

        {/* flash de transição — toca uma vez ao entrar em sucesso/erro, sobre o movimento contínuo */}
        {(estado === "sucesso" || estado === "erro") && (
          <div
            key={estado}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              animation:
                estado === "sucesso" ? "glow-pulse-success 0.9s ease-out" : "glow-pulse-error 0.6s ease-in-out",
            }}
          />
        )}
      </div>
    </div>
  );
}
