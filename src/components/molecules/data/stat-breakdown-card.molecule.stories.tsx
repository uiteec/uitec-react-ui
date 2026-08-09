import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "lucide-react";
import { StatBreakdownCardMolecule } from "./stat-breakdown-card.molecule";

const meta = {
  title: "Molecules/Data/StatBreakdownCardMolecule",
  component: StatBreakdownCardMolecule,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { StatBreakdownCardMolecule } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    label: "Agendamentos",
    icon: Calendar,
    items: [
      { label: "Este mês", value: 214, variacao: 8.2 },
      { label: "Mês passado", value: 198, variacao: -2.1 },
    ],
  },
} satisfies Meta<typeof StatBreakdownCardMolecule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
