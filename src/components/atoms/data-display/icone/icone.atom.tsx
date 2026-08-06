import { cn } from "@/lib/utils";

interface IconeAtomProps {
  src: string;
  alt?: string;
  tamanho?: number;
  className?: string;
}

/** Renderiza um ícone SVG estático de /public/assets/icones. */
export function IconeAtom({ src, alt = "ícone", tamanho = 16, className }: IconeAtomProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={tamanho} height={tamanho} className={cn("shrink-0", className)} />
  );
}
