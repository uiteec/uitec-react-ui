import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { KanbanBoard, KanbanCard, KanbanCards, KanbanHeader, KanbanProvider } from "./kanban";

const meta = {
  title: "UI/Kanban",
  component: KanbanProvider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          '```tsx\nimport { KanbanProvider, KanbanBoard, KanbanHeader, KanbanCards, KanbanCard } from "uitec-react-ui";\n```\n\nPrimitivas headless de kanban com drag-and-drop (`@dnd-kit`). `KanbanProvider` controla o estado de arraste e chama `onDataChange` com a lista reordenada; `KanbanBoard`/`KanbanCards`/`KanbanCard` só cuidam do layout — o conteúdo de cada card é livre.',
      },
    },
  },
} satisfies Meta<typeof KanbanProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

type Card = { id: string; name: string; column: string };

const COLUNAS = [
  { id: "aberto", name: "Aberto" },
  { id: "andamento", name: "Em andamento" },
  { id: "concluido", name: "Concluído" },
];

const CARDS_INICIAIS: Card[] = [
  { id: "1", name: "Configurar ambiente", column: "concluido" },
  { id: "2", name: "Revisar proposta comercial", column: "andamento" },
  { id: "3", name: "Enviar contrato", column: "aberto" },
  { id: "4", name: "Ligar para o cliente", column: "aberto" },
];

function KanbanDemo() {
  const [data, setData] = useState<Card[]>(CARDS_INICIAIS);

  return (
    <KanbanProvider columns={COLUNAS} data={data} onDataChange={setData} className="h-96">
      {(column) => (
        <KanbanBoard id={column.id} key={column.id} className="border border-background-stroke">
          <KanbanHeader>{column.name}</KanbanHeader>
          <KanbanCards id={column.id} className="px-3">
            {(item) => (
              <KanbanCard key={item.id} {...item}>
                <div className="rounded-lg border border-background-stroke bg-background-card p-3 text-sm text-font-default shadow-sm">
                  {item.name}
                </div>
              </KanbanCard>
            )}
          </KanbanCards>
        </KanbanBoard>
      )}
    </KanbanProvider>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <KanbanDemo />,
};
