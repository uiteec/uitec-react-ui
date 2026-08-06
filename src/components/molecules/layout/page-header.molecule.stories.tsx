import type { Meta, StoryObj } from "@storybook/react";
import { PageHeaderMolecule } from "./page-header.molecule";
import { ButtonAtom } from "@/components/atoms/buttons";
import { type BreadcrumbItem } from "../layout/breadcrumbs.molecule";

const breadcrumbs: BreadcrumbItem[] = [
  { label: "Configurações", href: "/configuracoes" },
  { label: "Usuários" },
];

const meta = {
  title: "Molecules/Layout/PageHeaderMolecule",
  component: PageHeaderMolecule,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { PageHeaderMolecule } from "componentes-react";\n```',
      },
    },
  },
  args: {
    title: "Usuários",
    subtitle: "Gerencie os usuários que têm acesso ao sistema.",
    breadcrumbs,
    action: <ButtonAtom text="Novo usuário" />,
  },
} satisfies Meta<typeof PageHeaderMolecule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SemBreadcrumbs: Story = {
  args: {
    breadcrumbs: undefined,
    action: undefined,
  },
};
