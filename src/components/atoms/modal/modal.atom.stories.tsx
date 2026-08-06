import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ModalAtom } from "./modal.atom";
import { ButtonAtom } from "../buttons/button.atom";

const meta = {
  title: "Atoms/Modal/ModalAtom",
  component: ModalAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { ModalAtom } from "componentes-react";\n```',
      },
    },
  },
} satisfies Meta<typeof ModalAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function ModalDemo() {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <ButtonAtom text="Abrir modal" onClick={() => setOpen(true)} />
      <ModalAtom
        open={open}
        onClose={() => setOpen(false)}
        title="Confirmar ação"
        subtitle="Essa ação não poderá ser desfeita."
        size="md"
        footer={
          <>
            <ButtonAtom variant="outline" text="Cancelar" onClick={() => setOpen(false)} />
            <ButtonAtom variant="danger" text="Confirmar" onClick={() => setOpen(false)} />
          </>
        }
      >
        <p className="text-sm" style={{ color: "var(--font-vector)" }}>
          Conteúdo do modal vai aqui.
        </p>
      </ModalAtom>
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <ModalDemo />,
};
