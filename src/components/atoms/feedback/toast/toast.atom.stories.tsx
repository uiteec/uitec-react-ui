import type { Meta, StoryObj } from "@storybook/react";
import { ToastAtom } from "./toast.atom";

const meta = {
  title: "Atoms/Feedback/ToastAtom",
  component: ToastAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { ToastAtom } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    variant: "success",
    title: "Salvo com sucesso",
    message: "As alterações foram salvas.",
  },
} satisfies Meta<typeof ToastAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ComAcao: Story = {
  args: {
    action: { label: "Desfazer", onClick: () => {} },
    onClose: () => {},
  },
};

export const Variantes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ToastAtom variant="success" title="Sucesso" message="Operação concluída." />
      <ToastAtom variant="error" title="Erro" message="Algo deu errado." />
      <ToastAtom variant="warning" title="Atenção" message="Verifique os dados." />
      <ToastAtom variant="info" title="Info" message="Nova atualização disponível." />
    </div>
  ),
};
