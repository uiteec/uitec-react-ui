import type { Meta, StoryObj } from "@storybook/react";
import { BadgeAtom } from "./badge.atom";

const meta = {
  title: "Atoms/DataDisplay/BadgeAtom",
  component: BadgeAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { BadgeAtom } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    label: "Ativo",
    variant: "primary",
    size: "md",
  },
} satisfies Meta<typeof BadgeAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ComPonto: Story = {
  args: {
    dot: true,
  },
};

export const Variantes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <BadgeAtom label="Primary" variant="primary" />
      <BadgeAtom label="Secondary" variant="secondary" />
      <BadgeAtom label="Success" variant="success" />
      <BadgeAtom label="Error" variant="error" />
      <BadgeAtom label="Warning" variant="warning" />
      <BadgeAtom label="Info" variant="info" />
      <BadgeAtom label="Neutral" variant="neutral" />
    </div>
  ),
};
