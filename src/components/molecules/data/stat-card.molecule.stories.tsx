import type { Meta, StoryObj } from "@storybook/react";
import { Users, DollarSign, ShoppingCart } from "lucide-react";
import { StatCardMolecule } from "./stat-card.molecule";

const meta = {
  title: "Molecules/Data/StatCardMolecule",
  component: StatCardMolecule,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { StatCardMolecule } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    label: "Usuários ativos",
    value: "1.284",
    icon: Users,
  },
} satisfies Meta<typeof StatCardMolecule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ComVariacaoPositiva: Story = {
  args: {
    label: "Receita do mês",
    value: "R$ 48.230",
    icon: DollarSign,
    variacao: 12.4,
  },
};

export const ComVariacaoNegativa: Story = {
  args: {
    label: "Carrinhos abandonados",
    value: "312",
    icon: ShoppingCart,
    variacao: -6.8,
  },
};

export const Ativo: Story = {
  args: {
    ativo: true,
    onClick: () => {},
  },
};

export const Clicavel: Story = {
  args: {
    onClick: () => {},
  },
};
