import type { Meta, StoryObj } from "@storybook/react";
import { BreadcrumbsMolecule, type BreadcrumbItem } from "./breadcrumbs.molecule";

const items: BreadcrumbItem[] = [
  { label: "Configurações", href: "/configuracoes" },
  { label: "Usuários", href: "/configuracoes/usuarios" },
  { label: "Editar usuário" },
];

const meta = {
  title: "Molecules/Layout/BreadcrumbsMolecule",
  component: BreadcrumbsMolecule,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { BreadcrumbsMolecule } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    items,
    showHome: true,
  },
} satisfies Meta<typeof BreadcrumbsMolecule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SemInicio: Story = {
  args: {
    showHome: false,
  },
};
