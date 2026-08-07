import type { Meta, StoryObj } from "@storybook/react";
import { TypingTextAtom } from "./typing-text.atom";

const meta = {
  title: "Atoms/Decorative/TypingTextAtom",
  component: TypingTextAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { TypingTextAtom } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    texto: "Carregando dados...",
  },
} satisfies Meta<typeof TypingTextAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
