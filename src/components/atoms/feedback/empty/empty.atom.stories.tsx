import type { Meta, StoryObj } from "@storybook/react";
import { EmptyAtom } from "./empty.atom";

const meta = {
  title: "Atoms/Feedback/EmptyAtom",
  component: EmptyAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { EmptyAtom } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    title: "Nenhum resultado encontrado",
    message: "Não há dados para exibir no momento.",
  },
} satisfies Meta<typeof EmptyAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ComAcao: Story = {
  args: {
    action: { label: "Criar novo item", onClick: () => {} },
  },
};
