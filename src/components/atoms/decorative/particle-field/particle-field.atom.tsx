"use client";

interface ParticleFieldAtomProps {
  quantidade?: number;
}

function seedParticula(indice: number) {
  const angulo = (indice * 137.5) % 360;
  const raio = 20 + ((indice * 37) % 60);
  const rad = (angulo * Math.PI) / 180;
  return {
    left: `${50 + raio * Math.cos(rad)}%`,
    top: `${50 + raio * Math.sin(rad)}%`,
    dx: `${((indice % 5) - 2) * 18}px`,
    dy: `${-20 - ((indice * 13) % 40)}px`,
    delay: `${(indice * 0.7) % 6}s`,
    duracao: `${5 + (indice % 4)}s`,
    tamanho: 3 + (indice % 3),
  };
}

export function ParticleFieldAtom({ quantidade = 8 }: ParticleFieldAtomProps) {
  const particulas = Array.from({ length: quantidade }, (_, indice) => seedParticula(indice));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particulas.map((particula, indice) => (
        <span
          key={indice}
          className="app-particle absolute rounded-full"
          style={
            {
              left: particula.left,
              top: particula.top,
              width: particula.tamanho,
              height: particula.tamanho,
              background: "var(--app-particle)",
              animation: `particle-drift ${particula.duracao} ease-in-out infinite`,
              animationDelay: particula.delay,
              "--particle-dx": particula.dx,
              "--particle-dy": particula.dy,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
