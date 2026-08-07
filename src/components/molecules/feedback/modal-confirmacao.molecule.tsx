"use client";

import { useState, type ReactNode } from "react";
import { AlertTriangle, Check, CheckCircle, Trash2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ButtonAtom, type ButtonVariant } from "@/components/atoms/buttons";

type Variante = "danger" | "warning" | "default" | "success";

const VARIANTE_CONFIG: Record<
  Variante,
  {
    iconeBg: string;
    iconeClass: string;
    Icone: React.ElementType;
    botaoVariant: ButtonVariant;
  }
> = {
  danger: {
    iconeBg: "bg-error-100",
    iconeClass: "text-error-300",
    Icone: Trash2,
    botaoVariant: "danger",
  },
  warning: {
    iconeBg: "bg-warning-100",
    iconeClass: "text-warning-400",
    Icone: AlertTriangle,
    botaoVariant: "primary",
  },
  default: {
    iconeBg: "bg-primary-100",
    iconeClass: "text-primary-default",
    Icone: CheckCircle,
    botaoVariant: "primary",
  },
  success: {
    iconeBg: "bg-success-100",
    iconeClass: "text-success-400",
    Icone: CheckCircle,
    botaoVariant: "success",
  },
};

export interface ModalConfirmacaoProps {
  open: boolean;
  onClose: () => void;
  onConfirmar: () => Promise<void>;
  titulo: string;
  descricao: ReactNode;
  textoBotaoConfirmar?: string;
  variante?: Variante;
  centralizado?: boolean;
  ocultarIcones?: boolean;
  largo?: boolean;
}

export function ModalConfirmacaoMolecule({
  open,
  onClose,
  onConfirmar,
  titulo,
  descricao,
  textoBotaoConfirmar = "Confirmar",
  variante = "default",
  centralizado = false,
  ocultarIcones = false,
  largo = false,
}: ModalConfirmacaoProps) {
  const [carregando, setCarregando] = useState(false);
  const { iconeBg, iconeClass, Icone, botaoVariant } = VARIANTE_CONFIG[variante];

  async function handleConfirmar() {
    setCarregando(true);
    try {
      await onConfirmar();
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && !carregando && onClose()}>
      <DialogContent
        className={largo ? "max-w-lg" : "max-w-sm"}
        showCloseButton={false}
        centered={centralizado}
      >
        <DialogHeader>
          {!ocultarIcones && (
            <div
              className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full ${iconeBg}`}
            >
              <Icone size={20} className={iconeClass} />
            </div>
          )}
          <DialogTitle>{titulo}</DialogTitle>
          <DialogDescription asChild>
            <div>{descricao}</div>
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 justify-between">
          <ButtonAtom
            variant="ghost"
            icon={ocultarIcones ? undefined : X}
            text="Cancelar"
            onClick={onClose}
            disabled={carregando}
            type="button"
          />
          <ButtonAtom
            variant={botaoVariant}
            icon={ocultarIcones ? undefined : variante === "danger" ? Trash2 : Check}
            text={textoBotaoConfirmar}
            loading={carregando}
            onClick={handleConfirmar}
            type="button"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
