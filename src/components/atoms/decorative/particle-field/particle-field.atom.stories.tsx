import type { Meta, StoryObj } from "@storybook/react";
import { ParticleFieldAtom } from "./particle-field.atom";

const meta = {
  title: "Atoms/Decorative/ParticleFieldAtom",
  component: ParticleFieldAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { ParticleFieldAtom } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    quantidade: 8,
  },
} satisfies Meta<typeof ParticleFieldAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="relative h-64 w-full overflow-hidden rounded-2xl" style={{ background: "var(--background-card)" }}>
      <ParticleFieldAtom {...args} />
    </div>
  ),
};
