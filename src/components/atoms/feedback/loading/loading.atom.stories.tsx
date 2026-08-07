import type { Meta, StoryObj } from "@storybook/react";
import { LoadingAtom } from "./loading.atom";

const meta = {
  title: "Atoms/Feedback/LoadingAtom",
  component: LoadingAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { LoadingAtom } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    variant: "spinner",
    size: "md",
    label: "Carregando...",
  },
} satisfies Meta<typeof LoadingAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variantes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <LoadingAtom variant="spinner" label="spinner" />
      <LoadingAtom variant="dots" label="dots" />
      <LoadingAtom variant="pulse" label="pulse" />
    </div>
  ),
};
