import type { Meta, StoryObj } from "@storybook/react";
import { CardAtom } from "./card.atom";

const meta = {
  title: "Atoms/DataDisplay/CardAtom",
  component: CardAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { CardAtom } from "componentes-react";\n```',
      },
    },
  },
  args: {
    padding: "md",
    shadow: true,
    bordered: false,
    children: "Conteúdo do card",
  },
} satisfies Meta<typeof CardAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ComTitulo: Story = {
  args: {
    title: "Título do card",
    subtitle: "Subtítulo com detalhes adicionais",
  },
};

export const ComAcao: Story = {
  args: {
    title: "Faturamento",
    subtitle: "Resumo do mês atual",
    action: <button className="text-sm font-semibold text-primary-default">Ver mais</button>,
  },
};
