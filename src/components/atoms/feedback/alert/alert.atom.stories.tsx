import type { Meta, StoryObj } from "@storybook/react";
import { AlertAtom } from "./alert.atom";

const meta = {
  title: "Atoms/Feedback/AlertAtom",
  component: AlertAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { AlertAtom } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    variant: "info",
    title: "Atenção",
    message: "Essa é uma mensagem informativa para o usuário.",
  },
} satisfies Meta<typeof AlertAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ComFechar: Story = {
  args: {
    onClose: () => {},
  },
};

export const Variantes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-96">
      <AlertAtom variant="success" title="Sucesso" message="Operação realizada com sucesso." />
      <AlertAtom variant="error" title="Erro" message="Não foi possível concluir a operação." />
      <AlertAtom variant="warning" title="Atenção" message="Revise os dados antes de continuar." />
      <AlertAtom variant="info" title="Informação" message="Essa é uma mensagem informativa." />
    </div>
  ),
};
