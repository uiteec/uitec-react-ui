"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BotaoAcaoAtomProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	titulo?: string;
	contador?: number;
	corContador?: string;
	corTextContador?: string;
	children: React.ReactNode;
}

export function BotaoAcaoAtom({
	titulo,
	contador,
	corContador = "bg-primary-default",
	corTextContador = "text-white",
	className,
	children,
	disabled,
	...props
}: BotaoAcaoAtomProps) {
	return (
		<button
			type="button"
			title={titulo}
			disabled={disabled}
			className={cn(
				"group relative flex h-8 w-8 items-center justify-center rounded-full outline-none transition-all select-none",
				!disabled && "cursor-pointer hover:bg-gray-100 active:scale-95",
				disabled && "cursor-not-allowed opacity-50",
				className,
			)}
			{...props}
		>
			<div
				className={cn(
					"flex items-center justify-center transition-opacity",
					!disabled ? "opacity-60 group-hover:opacity-100" : "opacity-40",
				)}
			>
				{children}
			</div>
			{(contador ?? 0) > 0 && (
				<span
					className={cn(
						"pointer-events-none absolute -top-0.5 -left-0.5 z-10 flex h-4 w-4 min-w-[16px] items-center justify-center rounded-full text-[10px] font-semibold shadow-sm ring-2 ring-white",
						corTextContador,
						corContador,
					)}
				>
					{contador}
				</span>
			)}
		</button>
	);
}
