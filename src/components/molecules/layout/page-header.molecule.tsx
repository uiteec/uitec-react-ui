import { type ReactNode } from "react";
import { BreadcrumbsMolecule, type BreadcrumbItem } from "./breadcrumbs.molecule";
import { cn } from "@/lib/utils";

interface PageHeaderMoleculeProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  action?: ReactNode;
  titleAddon?: ReactNode;
  subtitleAddon?: ReactNode;
  className?: string;
}

export function PageHeaderMolecule({ title, subtitle, breadcrumbs, action, titleAddon, subtitleAddon, className }: PageHeaderMoleculeProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-6", className)}>
      <div className="flex flex-1 flex-col gap-1">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <BreadcrumbsMolecule items={breadcrumbs} />
        )}
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold leading-tight" style={{ color: "var(--font-default)" }}>
            {title}
          </h1>
          {titleAddon}
        </div>
        {(subtitle || subtitleAddon) && (
          <div className="flex items-center gap-3">
            {subtitle && (
              <p className="text-sm shrink-0" style={{ color: "var(--font-vector)" }}>
                {subtitle}
              </p>
            )}
            {subtitleAddon}
          </div>
        )}
      </div>
      {action && (
        <div className="shrink-0 pt-1">
          {action}
        </div>
      )}
    </div>
  );
}
