import type { Meta, StoryObj } from "@storybook/react";
import { Mail } from "lucide-react";
import { ButtonAtom } from "./button.atom";

const meta = {
  title: "Atoms/ButtonAtom",
  component: ButtonAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { ButtonAtom } from "componentes-react";\n```',
      },
    },
  },
  args: {
    text: "Salvar",
    variant: "primary",
    size: "md",
    loading: false,
    fullWidth: false,
    disabled: false,
  },
} satisfies Meta<typeof ButtonAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ComIcone: Story = {
  args: {
    text: "Enviar",
    icon: Mail,
  },
};

export const Carregando: Story = {
  args: {
    loading: true,
  },
};

export const Variantes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ButtonAtom text="Primary" variant="primary" />
      <ButtonAtom text="Secondary" variant="secondary" />
      <ButtonAtom text="Outline" variant="outline" />
      <ButtonAtom text="Ghost" variant="ghost" />
      <ButtonAtom text="Link" variant="link" />
      <ButtonAtom text="Danger" variant="danger" />
    </div>
  ),
};

export const Tamanhos: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <ButtonAtom text="Small" size="sm" />
      <ButtonAtom text="Medium" size="md" />
      <ButtonAtom text="Large" size="lg" />
    </div>
  ),
};
