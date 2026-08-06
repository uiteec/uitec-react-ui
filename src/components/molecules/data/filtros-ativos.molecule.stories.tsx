import type { Meta, StoryObj } from "@storybook/react";
import { FiltrosAtivosMolecule, type FiltroAtivoItem } from "./filtros-ativos.molecule";

const filtros: FiltroAtivoItem[] = [
  { label: "Status: Ativo", onRemover: () => {} },
  { label: "Categoria: Financeiro", onRemover: () => {} },
];

const meta = {
  title: "Molecules/Data/FiltrosAtivosMolecule",
  component: FiltrosAtivosMolecule,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FiltrosAtivosMolecule } from "componentes-react";\n```',
      },
    },
  },
  args: {
    filtros,
    onLimparTudo: () => {},
  },
} satisfies Meta<typeof FiltrosAtivosMolecule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const UmFiltro: Story = {
  args: {
    filtros: [{ label: "Status: Ativo", onRemover: () => {} }],
  },
};
