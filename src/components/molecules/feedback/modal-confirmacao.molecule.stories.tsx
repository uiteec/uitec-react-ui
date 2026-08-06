import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ModalConfirmacaoMolecule } from "./modal-confirmacao.molecule";
import { ButtonAtom } from "@/components/atoms/buttons";

const meta = {
  title: "Molecules/ModalConfirmacaoMolecule",
  component: ModalConfirmacaoMolecule,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { ModalConfirmacaoMolecule } from "componentes-react";\n```',
      },
    },
  },
} satisfies Meta<typeof ModalConfirmacaoMolecule>;

export default meta;
type Story = StoryObj<typeof meta>;

function ModalConfirmacaoDemo() {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <ButtonAtom text="Excluir item" variant="danger" onClick={() => setOpen(true)} />
      <ModalConfirmacaoMolecule
        open={open}
        onClose={() => setOpen(false)}
        onConfirmar={async () => {}}
        titulo="Excluir registro"
        descricao="Essa ação é permanente e não poderá ser desfeita. Deseja continuar?"
        textoBotaoConfirmar="Excluir"
        variante="danger"
      />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <ModalConfirmacaoDemo />,
};
