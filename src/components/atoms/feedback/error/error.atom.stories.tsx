import type { Meta, StoryObj } from "@storybook/react";
import { ErrorAtom } from "./error.atom";

const meta = {
  title: "Atoms/Feedback/ErrorAtom",
  component: ErrorAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { ErrorAtom } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    title: "Algo deu errado",
    message: "Ocorreu um erro inesperado. Tente novamente.",
  },
} satisfies Meta<typeof ErrorAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ComRetry: Story = {
  args: {
    onRetry: () => {},
  },
};
