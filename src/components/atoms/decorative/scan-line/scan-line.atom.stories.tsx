import type { Meta, StoryObj } from "@storybook/react";
import { ScanLineAtom } from "./scan-line.atom";

const meta = {
  title: "Atoms/Decorative/ScanLineAtom",
  component: ScanLineAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { ScanLineAtom } from "componentes-react";\n```',
      },
    },
  },
  args: {
    ativo: true,
  },
} satisfies Meta<typeof ScanLineAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="relative h-40 w-full overflow-hidden rounded-xl" style={{ background: "var(--background-card)" }}>
      <ScanLineAtom {...args} />
    </div>
  ),
};

export const Inativo: Story = {
  args: {
    ativo: false,
  },
  render: (args) => (
    <div className="relative h-40 w-full overflow-hidden rounded-xl" style={{ background: "var(--background-card)" }}>
      <ScanLineAtom {...args} />
    </div>
  ),
};
