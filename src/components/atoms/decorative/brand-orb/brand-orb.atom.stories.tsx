import type { Meta, StoryObj } from "@storybook/react";
import { BrandOrbAtom } from "./brand-orb.atom";

const meta = {
  title: "Atoms/Decorative/BrandOrbAtom",
  component: BrandOrbAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { BrandOrbAtom } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    estado: "idle",
    size: 96,
  },
} satisfies Meta<typeof BrandOrbAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Estados: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <BrandOrbAtom estado="idle" size={80} />
      <BrandOrbAtom estado="pensando" size={80} />
      <BrandOrbAtom estado="sucesso" size={80} />
      <BrandOrbAtom estado="erro" size={80} />
    </div>
  ),
};
