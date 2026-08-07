import type { Meta, StoryObj } from "@storybook/react";
import { TabelaMolecule, type TabelaColuna } from "./tabela.molecule";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  status: string;
}

const colunas: TabelaColuna[] = [
  { label: "Nome", sortKey: "nome" },
  { label: "E-mail" },
  { label: "Status", align: "right" },
];

const dados: Usuario[] = [
  { id: 1, nome: "Ana Souza", email: "ana@exemplo.com", status: "Ativo" },
  { id: 2, nome: "Bruno Lima", email: "bruno@exemplo.com", status: "Inativo" },
  { id: 3, nome: "Carla Melo", email: "carla@exemplo.com", status: "Ativo" },
];

const meta = {
  title: "Molecules/Data/TabelaMolecule",
  component: TabelaMolecule,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { TabelaMolecule } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    dados,
    colunas,
    carregando: false,
    erro: false,
    getKey: (item: Usuario) => item.id,
    renderLinha: (item: Usuario) => (
      <>
        <td className="px-4 py-3">{item.nome}</td>
        <td className="px-4 py-3">{item.email}</td>
        <td className="px-4 py-3 text-right">{item.status}</td>
      </>
    ),
  },
} satisfies Meta<typeof TabelaMolecule<Usuario>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Carregando: Story = {
  args: {
    carregando: true,
  },
};

export const Erro: Story = {
  args: {
    erro: true,
    onRetry: () => {},
  },
};

export const Vazio: Story = {
  args: {
    dados: [],
    textoVazio: "Nenhum usuário cadastrado",
  },
};
