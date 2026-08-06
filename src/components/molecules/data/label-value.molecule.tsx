import { cn } from "@/lib/utils";

interface LabelValueMoleculeProps {
  label: string;
  value?: string | number | null;
  className?: string;
}

export function LabelValueMolecule({ label, value, className }: LabelValueMoleculeProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <span className="text-xs font-semibold text-font-vector">{label}</span>
      <span className="text-sm text-font-default">{value ?? "—"}</span>
    </div>
  );
}
