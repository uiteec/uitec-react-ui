"use client";

import { useEffect, useState, type WheelEvent } from "react";
import { ExternalLink, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { ModalAtom } from "@/components/atoms/modal";
import { ButtonAtom } from "@/components/atoms/buttons";

export interface ModalVisualizarArquivoProps {
  open: boolean;
  onClose: () => void;
  url: string | null;
  titulo?: string;
}

const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
const ZOOM_PASSO = 0.15;

function ehImagem(url: string): boolean {
  return /\.(jpe?g|png|gif|webp|bmp)(\?|$)/i.test(url);
}

function clamp(valor: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, valor));
}

export function ModalVisualizarArquivoMolecule({ open, onClose, url, titulo }: ModalVisualizarArquivoProps) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (open) setZoom(1);
  }, [open, url]);

  function handleWheel(e: WheelEvent<HTMLDivElement>) {
    if (!ehImagem(url ?? "")) return;
    e.preventDefault();
    setZoom((z) => clamp(z - e.deltaY * 0.0015, ZOOM_MIN, ZOOM_MAX));
  }

  const imagem = !!url && ehImagem(url);

  return (
    <ModalAtom open={open && !!url} onClose={onClose} title={titulo ?? "Visualizar arquivo"} size="full">
      {url && (
        <div className="flex flex-col gap-3">
          <div
            onWheel={handleWheel}
            className="flex items-center justify-center h-[70vh] overflow-auto rounded-xl"
            style={{ background: "var(--background-default)" }}
          >
            {imagem ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={url}
                alt={titulo ?? "arquivo"}
                className="max-w-full max-h-full object-contain select-none"
                style={{ transform: `scale(${zoom})`, transformOrigin: "center center", cursor: zoom > 1 ? "grab" : "default" }}
                draggable={false}
              />
            ) : (
              <iframe src={url} title={titulo ?? "arquivo"} className="w-full h-full" />
            )}
          </div>

          <div className="flex items-center gap-3">
            {imagem && (
              <div className="flex items-center gap-1">
                <ButtonAtom icon={ZoomOut} variant="ghost" size="sm" className="px-2" title="Diminuir zoom" onClick={() => setZoom((z) => clamp(z - ZOOM_PASSO, ZOOM_MIN, ZOOM_MAX))} />
                <span className="text-xs w-11 text-center" style={{ color: "var(--font-vector)" }}>{Math.round(zoom * 100)}%</span>
                <ButtonAtom icon={ZoomIn} variant="ghost" size="sm" className="px-2" title="Aumentar zoom" onClick={() => setZoom((z) => clamp(z + ZOOM_PASSO, ZOOM_MIN, ZOOM_MAX))} />
                <ButtonAtom icon={RotateCcw} variant="ghost" size="sm" className="px-2" title="Restaurar zoom" onClick={() => setZoom(1)} />
              </div>
            )}

            <div className="flex-1" />

            <ButtonAtom icon={ExternalLink} variant="ghost" size="sm" text="Abrir em nova aba" onClick={() => window.open(url, "_blank")} />
          </div>
        </div>
      )}
    </ModalAtom>
  );
}
