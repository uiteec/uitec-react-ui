import type { Meta, StoryObj } from "@storybook/react";
import { Pencil } from "lucide-react";
import { BotaoAcaoAtom } from "./botao-acao.atom";

const meta = {
  title: "Atoms/BotaoAcaoAtom",
  component: BotaoAcaoAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { BotaoAcaoAtom } from "componentes-react";\n```',
      },
    },
  },
  args: {
    titulo: "Editar",
    disabled: false,
    children: <Pencil size={16} />,
  },
} satisfies Meta<typeof BotaoAcaoAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ComContador: Story = {
  args: {
    contador: 3,
  },
};

export const Desabilitado: Story = {
  args: {
    disabled: true,
  },
};
