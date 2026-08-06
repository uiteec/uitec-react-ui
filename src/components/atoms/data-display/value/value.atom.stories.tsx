import type { Meta, StoryObj } from "@storybook/react";
import { ValueAtom } from "./value.atom";

const meta = {
  title: "Atoms/DataDisplay/ValueAtom",
  component: ValueAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { ValueAtom } from "componentes-react";\n```',
      },
    },
  },
  args: {
    label: "Faturamento",
    value: "R$ 12.480,00",
    horizontal: false,
    size: "md",
  },
} satisfies Meta<typeof ValueAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: {
    horizontal: true,
  },
};
