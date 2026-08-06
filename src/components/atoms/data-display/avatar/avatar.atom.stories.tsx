import type { Meta, StoryObj } from "@storybook/react";
import { AvatarAtom } from "./avatar.atom";

const meta = {
  title: "Atoms/DataDisplay/AvatarAtom",
  component: AvatarAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { AvatarAtom } from "componentes-react";\n```',
      },
    },
  },
  args: {
    name: "Ayla Uitec",
    size: "md",
    shape: "circle",
  },
} satisfies Meta<typeof AvatarAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Online: Story = {
  args: {
    online: true,
  },
};

export const Tamanhos: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <AvatarAtom name="Ayla Uitec" size="xs" />
      <AvatarAtom name="Ayla Uitec" size="sm" />
      <AvatarAtom name="Ayla Uitec" size="md" />
      <AvatarAtom name="Ayla Uitec" size="lg" />
      <AvatarAtom name="Ayla Uitec" size="xl" />
    </div>
  ),
};
