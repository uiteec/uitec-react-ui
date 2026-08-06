"use client";

import { useState } from "react";
import { Controller, type Control } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormPasswordAtomProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  className?: string;
}

export function FormPasswordAtom({
  control,
  name,
  placeholder,
  disabled,
  isInvalid,
  className,
}: FormPasswordAtomProps) {
  const [show, setShow] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="relative">
          <input
            {...field}
            value={field.value ?? ""}
            type={show ? "text" : "password"}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="current-password"
            className={cn(
              "w-full h-10 px-3 pr-10 rounded-lg text-sm outline-none transition-all",
              disabled && "opacity-60 cursor-not-allowed",
              className
            )}
            style={{
              background: disabled ? "var(--background-page)" : "var(--background-card)",
              border: isInvalid
                ? "1.5px solid var(--error-300)"
                : "1.5px solid var(--background-stroke)",
              color: "var(--font-default)",
            }}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShow((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--font-vector)" }}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      )}
    />
  );
}
