"use client";

import { useRef } from "react";
import { Controller, type Control } from "react-hook-form";
import { Upload, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormUploadAtomProps {
  control: Control<any>;
  name: string;
  disabled?: boolean;
  isInvalid?: boolean;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  variant?: "full" | "compact";
  className?: string;
}

export function FormUploadAtom({
  control,
  name,
  disabled,
  isInvalid,
  multiple = false,
  maxFiles = 1,
  maxSize,
  accept,
  variant = "full",
  className,
}: FormUploadAtomProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const files: File[] = Array.isArray(field.value)
          ? field.value
          : field.value
          ? [field.value]
          : [];

        const hasFiles = files.length > 0;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const selected = Array.from(e.target.files ?? []).slice(0, maxFiles);
          if (multiple) field.onChange(selected);
          else field.onChange(selected[0] ?? null);
          e.target.value = "";
        };

        const removeFile = (index: number) => {
          if (multiple) {
            const next = files.filter((_, i) => i !== index);
            field.onChange(next.length ? next : []);
          } else {
            field.onChange(null);
          }
        };

        if (variant === "compact") {
          return (
            <div className={cn("flex items-center gap-2", className)}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => inputRef.current?.click()}
                className={cn(
                  "h-10 px-4 rounded-lg text-sm font-medium flex items-center gap-2 transition-all",
                  disabled && "opacity-60 cursor-not-allowed"
                )}
                style={{
                  background: hasFiles ? "var(--success-50, #f0fdf4)" : "var(--background-card)",
                  border: isInvalid
                    ? "1.5px solid var(--error-300)"
                    : hasFiles
                    ? "1.5px solid var(--success-300, #22c55e)"
                    : "1.5px solid var(--background-stroke)",
                  color: hasFiles ? "var(--success-300, #22c55e)" : "var(--font-default)",
                }}
              >
                {hasFiles ? <CheckCircle size={16} /> : <Upload size={16} />}
                {hasFiles ? files[0]?.name ?? "Arquivo" : "Enviar arquivo"}
              </button>
              <input ref={inputRef} type="file" className="hidden" multiple={multiple} accept={accept} onChange={handleChange} disabled={disabled} />
            </div>
          );
        }

        return (
          <div className={cn("flex flex-col gap-2", className)}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => inputRef.current?.click()}
              className={cn(
                "w-full rounded-lg p-4 flex flex-col items-center gap-2 transition-all border-2 border-dashed",
                disabled && "opacity-60 cursor-not-allowed"
              )}
              style={{
                background: hasFiles ? "var(--success-50, #f0fdf4)" : "var(--background-page)",
                borderColor: isInvalid
                  ? "var(--error-300)"
                  : hasFiles
                  ? "var(--success-300, #22c55e)"
                  : "var(--background-stroke)",
              }}
            >
              {hasFiles ? (
                <CheckCircle size={28} style={{ color: "var(--success-300, #22c55e)" }} />
              ) : (
                <Upload size={28} style={{ color: "var(--font-vector)" }} />
              )}
              <p className="text-sm font-medium" style={{ color: hasFiles ? "var(--success-300, #22c55e)" : "var(--font-default)" }}>
                {hasFiles ? "Arquivo(s) selecionado(s)" : "Clique para enviar"}
              </p>
              {!hasFiles && (
                <p className="text-xs" style={{ color: "var(--font-vector)" }}>
                  {maxSize ? `Tamanho máximo: ${formatBytes(maxSize)}` : "Selecione um arquivo"}
                  {multiple && maxFiles > 1 ? ` · até ${maxFiles} arquivos` : ""}
                </p>
              )}
            </button>

            {/* Lista de arquivos */}
            {files.length > 0 && (
              <ul className="flex flex-col gap-1">
                {files.map((file, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between px-3 py-1.5 rounded-lg text-sm"
                    style={{ background: "var(--background-modal)" }}
                  >
                    <span className="truncate" style={{ color: "var(--font-default)" }}>{file.name}</span>
                    <button type="button" onClick={() => removeFile(i)} className="ml-2 flex-shrink-0 hover:opacity-70" style={{ color: "var(--font-vector)" }}>
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <input ref={inputRef} type="file" className="hidden" multiple={multiple} accept={accept} onChange={handleChange} disabled={disabled} />
          </div>
        );
      }}
    />
  );
}
