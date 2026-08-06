"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypingTextAtomProps {
  texto: string;
  className?: string;
}

export function TypingTextAtom({ texto, className }: TypingTextAtomProps) {
  const [chave, setChave] = useState(texto);

  useEffect(() => {
    setChave(texto);
  }, [texto]);

  return (
    <span
      key={chave}
      className={cn("app-typing-text inline-block", className)}
      style={{ animation: "type-reveal 0.6s steps(24, end)" }}
    >
      {texto}
    </span>
  );
}
