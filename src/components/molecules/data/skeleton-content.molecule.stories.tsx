import type { Meta, StoryObj } from "@storybook/react";
import {
  SkeletonTabelaMolecule,
  SkeletonListaMolecule,
  SkeletonCardsMolecule,
  SkeletonFormMolecule,
} from "./skeleton-content.molecule";

const meta = {
  title: "Molecules/SkeletonContentMolecule",
  component: SkeletonTabelaMolecule,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          '```tsx\nimport {\n  SkeletonTabelaMolecule,\n  SkeletonListaMolecule,\n  SkeletonCardsMolecule,\n  SkeletonFormMolecule,\n} from "componentes-react";\n```\n\nConjunto de placeholders de carregamento para os principais layouts de conteúdo: tabela, lista, cards e formulário.',
      },
    },
  },
  args: {
    linhas: 5,
    colunas: 4,
    mostrarHeader: true,
  },
} satisfies Meta<typeof SkeletonTabelaMolecule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tabela: Story = {};

export const Lista: StoryObj<typeof SkeletonListaMolecule> = {
  render: (args) => <SkeletonListaMolecule {...args} />,
  args: {
    itens: 5,
    avatar: true,
    linhasPorItem: 2,
  },
};

export const Cards: StoryObj<typeof SkeletonCardsMolecule> = {
  render: (args) => <SkeletonCardsMolecule {...args} />,
  args: {
    itens: 6,
    colunas: 3,
    altura: 120,
  },
};

export const Formulario: StoryObj<typeof SkeletonFormMolecule> = {
  render: (args) => (
    <div className="w-80">
      <SkeletonFormMolecule {...args} />
    </div>
  ),
  args: {
    campos: 4,
  },
};
