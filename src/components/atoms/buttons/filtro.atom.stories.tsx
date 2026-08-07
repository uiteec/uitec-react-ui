import type { Meta, StoryObj } from "@storybook/react";
import { FiltroAtom } from "./filtro.atom";

const meta = {
  title: "Atoms/Buttons/FiltroAtom",
  component: FiltroAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FiltroAtom } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    filtrosAtivos: 0,
    children: (
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-font-vector">Status</label>
        <select className="h-9 rounded-lg border border-background-stroke px-2 text-sm">
          <option>Todos</option>
          <option>Ativos</option>
          <option>Inativos</option>
        </select>
      </div>
    ),
  },
} satisfies Meta<typeof FiltroAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ComFiltrosAtivos: Story = {
  args: {
    filtrosAtivos: 2,
    onLimpar: () => {},
    onAplicar: () => {},
  },
};
