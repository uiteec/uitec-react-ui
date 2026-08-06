"use client";

import { Controller, type Control } from "react-hook-form";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormRatingAtomProps {
  control: Control<any>;
  name: string;
  size?: number;
  disabled?: boolean;
  isInvalid?: boolean;
  className?: string;
}

export function FormRatingAtom({ control, name, size = 24, disabled, className }: FormRatingAtomProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const rating = Number(field.value) || 0;

        return (
          <div className={cn("flex gap-1", className)}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                disabled={disabled}
                onClick={() => field.onChange(star === rating ? 0 : star)}
                className={cn("transition-transform hover:scale-110", disabled && "opacity-60 cursor-not-allowed")}
                style={{ cursor: disabled ? "not-allowed" : "pointer" }}
              >
                <Star
                  size={size}
                  fill={star <= rating ? "var(--warning-300, #f59e0b)" : "transparent"}
                  style={{ color: star <= rating ? "var(--warning-300, #f59e0b)" : "var(--background-stroke)" }}
                />
              </button>
            ))}
          </div>
        );
      }}
    />
  );
}
