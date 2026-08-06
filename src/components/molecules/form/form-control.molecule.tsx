"use client";

import { type ReactNode } from "react";
import { type UseFormReturn, type FieldValues, type FieldPath } from "react-hook-form";
import { type z, type ZodObject, type ZodTypeAny } from "zod";
import { cn } from "@/lib/utils";
import {
  FormTextAtom, FormEmailAtom, FormPasswordAtom, FormNumberAtom, FormTextareaAtom,
  FormPhoneAtom,
  FormCoinAtom, FormDecimalAtom, FormCreditCardAtom,
  FormDateAtom, FormTimepickerAtom, FormDateRangeAtom,
  FormSelectAtom, FormSelectCheckboxAtom, FormSelectChipAtom,
  FormCheckboxAtom, FormRadioAtom, FormToggleAtom,
  FormCodeInputAtom, FormRatingAtom, FormUploadAtom,
} from "@/components/atoms/forms";

// ─── Mapa de tipos ────────────────────────────────────────────────────────────

const COMPONENT_MAP = {
  // Texto
  text:             FormTextAtom,
  email:            FormEmailAtom,
  password:         FormPasswordAtom,
  number:           FormNumberAtom,
  textarea:         FormTextareaAtom,
  phone:            FormPhoneAtom,
  // Financeiro
  coin:             FormCoinAtom,
  decimal:          FormDecimalAtom,
  credit_card:      FormCreditCardAtom,
  // Data e hora
  date:             FormDateAtom,
  time:             FormTimepickerAtom,
  date_range:       FormDateRangeAtom,
  // Seleção
  select:           FormSelectAtom,
  select_checkbox:  FormSelectCheckboxAtom,
  select_chip:      FormSelectChipAtom,
  // Booleanos
  checkbox:         FormCheckboxAtom,
  radio:            FormRadioAtom,
  toggle:           FormToggleAtom,
  // Especiais
  code:             FormCodeInputAtom,
  rating:           FormRatingAtom,
  upload:           FormUploadAtom,
} as const;

export type FormFieldType = keyof typeof COMPONENT_MAP;

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface IFormSchema<TSchema extends ZodObject<any>> {
  form: UseFormReturn<z.infer<TSchema> & FieldValues>;
  schema: TSchema;
}

interface FormControlMoleculeProps<TSchema extends ZodObject<any>> {
  form: IFormSchema<TSchema>;
  name: FieldPath<z.infer<TSchema>>;
  type: FormFieldType;
  label?: string;
  description?: string;
  placeholder?: string;
  options?: any[];
  labelItem?: string | ReactNode;
  labelRight?: ReactNode;
  disabled?: boolean;
  className?: string;
  [key: string]: unknown;
}

// ─── Helpers de schema Zod ────────────────────────────────────────────────────

function getIsRequired(schema: ZodObject<any>, name: string): boolean {
  const field = schema.shape[name] as ZodTypeAny | undefined;
  return field ? !field.isOptional() : false;
}

function getMaxLength(schema: ZodObject<any>, name: string): number | undefined {
  try {
    let field = schema.shape[name] as any;
    while (field?._def?.innerType) field = field._def.innerType;
    const maxCheck = field?._def?.checks?.find((c: any) => c.kind === "max");
    return maxCheck?.value;
  } catch {
    return undefined;
  }
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function FormControlMolecule<TSchema extends ZodObject<any>>({
  form,
  name,
  type,
  label,
  description,
  placeholder,
  options = [],
  labelItem,
  labelRight,
  disabled,
  className,
  ...rest
}: FormControlMoleculeProps<TSchema>) {
  const { form: hookForm, schema } = form;
  const { control, formState: { errors } } = hookForm;

  const isRequired = getIsRequired(schema, name as string);
  const maxLength  = getMaxLength(schema, name as string);
  const errorMsg   = (errors[name as string]?.message as string) ?? undefined;
  const isInvalid  = !!errorMsg;

  const Component        = COMPONENT_MAP[type] as any;
  const isInlineLabelType = type === "checkbox" || type === "toggle";

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {/* Label */}
      {label && !isInlineLabelType && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium" style={{ color: "var(--font-default)" }}>
            {label}
            {isRequired && (
              <span className="ml-0.5" style={{ color: "var(--primary-default)" }}>*</span>
            )}
          </label>
          {labelRight && (
            <span className="text-xs" style={{ color: "var(--font-vector)" }}>
              {labelRight}
            </span>
          )}
        </div>
      )}

      {/* Atom de campo */}
      <Component
        control={control}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        isInvalid={isInvalid}
        maxLength={maxLength}
        options={options}
        labelItem={labelItem}
        {...rest}
      />

      {/* Descrição */}
      {description && !errorMsg && (
        <p className="text-xs" style={{ color: "var(--font-vector)" }}>
          {description}
        </p>
      )}

      {/* Erro */}
      {errorMsg && (
        <p className="text-xs" style={{ color: "var(--error-300)" }}>
          {errorMsg}
        </p>
      )}
    </div>
  );
}
