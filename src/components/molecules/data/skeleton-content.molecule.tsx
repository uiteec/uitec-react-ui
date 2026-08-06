import { SkeletonAtom } from "@/components/atoms/feedback/skeleton";
import { cn } from "@/lib/utils";

// ─── Tabela ────────────────────────────────────────────────────────────────

interface SkeletonTabelaProps {
  linhas?: number;
  colunas?: number;
  mostrarHeader?: boolean;
  className?: string;
}

export function SkeletonTabelaMolecule({
  linhas = 5,
  colunas = 4,
  mostrarHeader = true,
  className,
}: SkeletonTabelaProps) {
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <table className="w-full">
        {mostrarHeader && (
          <thead>
            <tr className="border-b border-background-divisor">
              {Array.from({ length: colunas }).map((_, i) => (
                <th key={i} className="px-4 py-3">
                  <SkeletonAtom width={i === colunas - 1 ? "60%" : "80%"} height={12} />
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {Array.from({ length: linhas }).map((_, row) => (
            <tr key={row} className={row % 2 === 0 ? "bg-transparent" : "bg-background-divisor/30"}>
              {Array.from({ length: colunas }).map((_, col) => (
                <td key={col} className="px-4 py-3">
                  <SkeletonAtom
                    width={col === colunas - 1 ? "40%" : col === 0 ? "30%" : `${60 + ((row + col) % 3) * 10}%`}
                    height={14}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Lista ─────────────────────────────────────────────────────────────────

interface SkeletonListaProps {
  itens?: number;
  avatar?: boolean;
  linhasPorItem?: number;
  className?: string;
}

export function SkeletonListaMolecule({
  itens = 5,
  avatar = true,
  linhasPorItem = 2,
  className,
}: SkeletonListaProps) {
  return (
    <div className={cn("flex flex-col divide-y divide-background-divisor", className)}>
      {Array.from({ length: itens }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3">
          {avatar && <SkeletonAtom variant="circle" width={36} />}
          <div className="flex-1 flex flex-col gap-2">
            {Array.from({ length: linhasPorItem }).map((_, j) => (
              <SkeletonAtom
                key={j}
                height={j === 0 ? 14 : 12}
                width={j === 0 ? "50%" : `${30 + ((i + j) % 4) * 8}%`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Cards ─────────────────────────────────────────────────────────────────

interface SkeletonCardsProps {
  itens?: number;
  colunas?: number;
  altura?: number;
  className?: string;
}

export function SkeletonCardsMolecule({
  itens = 6,
  colunas = 3,
  altura = 120,
  className,
}: SkeletonCardsProps) {
  return (
    <div
      className={cn("grid gap-4", className)}
      style={{ gridTemplateColumns: `repeat(${colunas}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: itens }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3 rounded-2xl border border-background-divisor p-4">
          <SkeletonAtom variant="rect" height={altura} />
          <SkeletonAtom height={14} width="70%" />
          <SkeletonAtom height={12} width="45%" />
        </div>
      ))}
    </div>
  );
}

// ─── Form ──────────────────────────────────────────────────────────────────

interface SkeletonFormProps {
  campos?: number;
  className?: string;
}

export function SkeletonFormMolecule({ campos = 4, className }: SkeletonFormProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {Array.from({ length: campos }).map((_, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <SkeletonAtom height={12} width="25%" />
          <SkeletonAtom height={38} />
        </div>
      ))}
    </div>
  );
}
