import { type LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

interface StatCardMoleculeProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color?: string;
  bg?: string;
  variacao?: number;
  onClick?: () => void;
  ativo?: boolean;
}

export function StatCardMolecule({
  label,
  value,
  icon: Icon,
  color = "var(--primary-default)",
  bg = "var(--primary-contrast)",
  variacao,
  onClick,
  ativo = false,
}: StatCardMoleculeProps) {
  return (
    <div
      className={`rounded-xl p-5 flex items-center gap-4 shadow-sm ${onClick ? "cursor-pointer transition-all hover:shadow-md" : ""}`}
      style={{ background: ativo ? "var(--primary-contrast)" : "var(--background-modal)" }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } } : undefined}
    >
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: ativo ? "var(--primary-default)" : bg }}
      >
        <Icon size={20} style={{ color: ativo ? "var(--background-modal)" : color }} />
      </div>
      <div>
        <p className="text-xs font-medium" style={{ color: "var(--font-vector)" }}>
          {label}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold mt-0.5" style={{ color: "var(--font-default)" }}>
            {value}
          </p>
          {variacao !== undefined && variacao !== 0 && (
            <div className={`flex items-center gap-1 ${variacao >= 0 ? "text-secondary-default" : "text-primary-default"}`}>
              {variacao >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="text-xs font-medium">{Math.abs(variacao).toFixed(1)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
