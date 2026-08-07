import type { Meta, StoryObj } from "@storybook/react";
import { SkeletonAtom } from "./skeleton.atom";

const meta = {
  title: "Atoms/Feedback/SkeletonAtom",
  component: SkeletonAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { SkeletonAtom } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    variant: "line",
    count: 1,
  },
} satisfies Meta<typeof SkeletonAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-72">
      <SkeletonAtom {...args} />
    </div>
  ),
};

export const MultiplasLinhas: Story = {
  args: {
    count: 3,
  },
  render: (args) => (
    <div className="w-72">
      <SkeletonAtom {...args} />
    </div>
  ),
};

export const Variantes: Story = {
  render: () => (
    <div className="flex items-center gap-4 w-96">
      <SkeletonAtom variant="circle" width={48} />
      <div className="flex-1 flex flex-col gap-2">
        <SkeletonAtom variant="line" />
        <SkeletonAtom variant="line" width="60%" />
      </div>
    </div>
  ),
};
