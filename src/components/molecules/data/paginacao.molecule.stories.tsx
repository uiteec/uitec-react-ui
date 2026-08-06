import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PaginacaoMolecule } from "./paginacao.molecule";

const meta = {
  title: "Molecules/Data/PaginacaoMolecule",
  component: PaginacaoMolecule,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { PaginacaoMolecule } from "componentes-react";\n```',
      },
    },
  },
  args: {
    total: 132,
    pageSize: 10,
  },
} satisfies Meta<typeof PaginacaoMolecule>;

export default meta;
type Story = StoryObj<typeof meta>;

function PaginacaoDemo(props: Omit<React.ComponentProps<typeof PaginacaoMolecule>, "page" | "onPageChange">) {
  const [page, setPage] = useState(0);
  return <PaginacaoMolecule page={page} onPageChange={setPage} {...props} />;
}

export const Default: Story = {
  args: {} as any,
  render: (args) => <PaginacaoDemo {...args} />,
};

export const ComTamanhoDePagina: Story = {
  args: {} as any,
  render: (args) => {
    function DemoComTamanho() {
      const [page, setPage] = useState(0);
      const [pageSize, setPageSize] = useState(10);
      return (
        <PaginacaoMolecule
          {...args}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(0);
          }}
        />
      );
    }
    return <DemoComTamanho />;
  },
};
