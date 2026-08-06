"use client";

import { type ReactNode, useState } from "react";
import { ModalAtom } from "@/components/atoms/modal";
import { ButtonAtom, type ButtonVariant } from "@/components/atoms/buttons";

interface ModalConfirmacaoMoleculeProps {
  open: boolean;
  onClose: () => void;
  onConfirmar: () => void | Promise<void>;
  titulo: string;
  descricao?: ReactNode;
  textoBotaoConfirmar?: string;
  variante?: ButtonVariant;
}

export function ModalConfirmacaoMolecule({
  open,
  onClose,
  onConfirmar,
  titulo,
  descricao,
  textoBotaoConfirmar = "Confirmar",
  variante = "danger",
}: ModalConfirmacaoMoleculeProps) {
  const [carregando, setCarregando] = useState(false);

  async function handleConfirmar() {
    setCarregando(true);
    try {
      await onConfirmar();
      onClose();
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ModalAtom open={open} onClose={onClose} title={titulo} size="sm">
      {descricao && (
        <p className="text-sm leading-relaxed" style={{ color: "var(--font-vector)" }}>
          {descricao}
        </p>
      )}

      <div className="flex justify-end gap-2 mt-6">
        <ButtonAtom
          variant="outline"
          text="Cancelar"
          onClick={onClose}
          disabled={carregando}
        />
        <ButtonAtom
          variant={variante}
          text={textoBotaoConfirmar}
          loading={carregando}
          onClick={handleConfirmar}
        />
      </div>
    </ModalAtom>
  );
}
