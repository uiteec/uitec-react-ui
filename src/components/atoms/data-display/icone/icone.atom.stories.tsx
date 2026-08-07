import type { Meta, StoryObj } from "@storybook/react";
import { IconeAtom } from "./icone.atom";

const SVG_EXEMPLO =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%234f1d96" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>'
  );

const meta = {
  title: "Atoms/DataDisplay/IconeAtom",
  component: IconeAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          '```tsx\nimport { IconeAtom } from "uitec-react-ui";\n```\n\n' +
          "⚠️ **Atenção:** `IconeAtom` renderiza um `<img>` a partir de um `src` de arquivo estático — ele **não empacota nenhum ícone junto**. " +
          "O componente foi originalmente feito pra carregar SVGs de `/public/assets/icones/*` do app consumidor. " +
          "Se o seu projeto não tiver esses arquivos nesse caminho, passe qualquer URL válida (asset próprio, CDN, ou uma data URI como nesta story) em `src`. " +
          "Para ícones vetoriais sem depender de arquivo externo, prefira os componentes de [lucide-react](https://lucide.dev) (já é peer usado internamente pelos outros atoms deste pacote).",
      },
    },
  },
  args: {
    src: SVG_EXEMPLO,
    alt: "Relógio",
    tamanho: 24,
  },
} satisfies Meta<typeof IconeAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tamanhos: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <IconeAtom src={SVG_EXEMPLO} alt="Relógio pequeno" tamanho={16} />
      <IconeAtom src={SVG_EXEMPLO} alt="Relógio médio" tamanho={24} />
      <IconeAtom src={SVG_EXEMPLO} alt="Relógio grande" tamanho={40} />
    </div>
  ),
};
