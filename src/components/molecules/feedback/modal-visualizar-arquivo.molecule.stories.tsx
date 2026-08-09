import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ModalVisualizarArquivoMolecule } from "./modal-visualizar-arquivo.molecule";
import { ButtonAtom } from "@/components/atoms/buttons";

const meta = {
  title: "Molecules/Feedback/ModalVisualizarArquivoMolecule",
  component: ModalVisualizarArquivoMolecule,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          '```tsx\nimport { ModalVisualizarArquivoMolecule } from "uitec-react-ui";\n```\n\nDetecta se a `url` aponta pra uma imagem (por extensão) e renderiza com zoom via scroll do mouse; caso contrário (PDF, etc.), cai num `<iframe>`.',
      },
    },
  },
} satisfies Meta<typeof ModalVisualizarArquivoMolecule>;

export default meta;
type Story = StoryObj<typeof meta>;

function ModalVisualizarArquivoDemo() {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <ButtonAtom text="Visualizar arquivo" variant="primary" onClick={() => setOpen(true)} />
      <ModalVisualizarArquivoMolecule
        open={open}
        onClose={() => setOpen(false)}
        url="https://picsum.photos/1200/800"
        titulo="comprovante.jpg"
      />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <ModalVisualizarArquivoDemo />,
};
