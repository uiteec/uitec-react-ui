import { type LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

interface StatBreakdownItem {
  label: string;
  value: number;
  variacao?: number;
}

interface StatBreakdownCardMoleculeProps {
  label: string;
  icon: LucideIcon;
  items: [StatBreakdownItem, StatBreakdownItem];
  color?: string;
  bg?: string;
}

export function StatBreakdownCardMolecule({
  label,
  icon: Icon,
  items,
  color = "var(--primary-default)",
  bg = "var(--primary-contrast)",
}: StatBreakdownCardMoleculeProps) {
  return (
    <div className="rounded-xl p-5 flex flex-col gap-3 shadow-sm" style={{ background: "var(--background-modal)" }}>
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: bg }}>
          <Icon size={20} style={{ color }} />
        </div>
        <p className="text-xs font-medium" style={{ color: "var(--font-vector)" }}>
          {label}
        </p>
      </div>
      <div className="flex gap-10">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-xs font-normal" style={{ color: "var(--font-default)" }}>
              {item.label}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-normal" style={{ color: "var(--font-default)" }}>
                {item.value}
              </span>
              {item.variacao !== undefined && item.variacao !== 0 && (
                <div className={`flex items-center gap-1 ${item.variacao >= 0 ? "text-secondary-default" : "text-primary-default"}`}>
                  {item.variacao >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span className="text-xs font-medium">{Math.abs(item.variacao).toFixed(1)}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
