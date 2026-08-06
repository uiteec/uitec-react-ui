import type { Meta, StoryObj } from "@storybook/react";
import { LabelValueMolecule } from "./label-value.molecule";

const meta = {
  title: "Molecules/LabelValueMolecule",
  component: LabelValueMolecule,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { LabelValueMolecule } from "componentes-react";\n```',
      },
    },
  },
  args: {
    label: "CPF",
    value: "123.456.789-00",
  },
} satisfies Meta<typeof LabelValueMolecule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SemValor: Story = {
  args: {
    value: null,
  },
};
