import type { Meta, StoryObj } from "@storybook/react";
import { Pencil, Trash2, Copy } from "lucide-react";
import { MenuAcoesAtom, type MenuAcaoItem } from "./menu-acoes.atom";

const itens: MenuAcaoItem[] = [
  { label: "Editar", icon: Pencil, onClick: () => {} },
  { label: "Duplicar", icon: Copy, onClick: () => {} },
  { label: "Excluir", icon: Trash2, onClick: () => {}, variant: "danger" },
];

const meta = {
  title: "Atoms/Buttons/MenuAcoesAtom",
  component: MenuAcoesAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { MenuAcoesAtom } from "componentes-react";\n```',
      },
    },
  },
  args: {
    itens,
  },
} satisfies Meta<typeof MenuAcoesAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
