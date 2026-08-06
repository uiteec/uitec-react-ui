import type { Meta, StoryObj } from "@storybook/react";
import { TooltipAtom } from "./tooltip.atom";

const meta = {
  title: "Atoms/DataDisplay/TooltipAtom",
  component: TooltipAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { TooltipAtom } from "componentes-react";\n```',
      },
    },
  },
  args: {
    content: "Texto de ajuda",
    placement: "top",
    children: (
      <button className="px-3 py-1.5 text-sm rounded-lg border border-background-stroke">
        Passe o mouse
      </button>
    ),
  },
} satisfies Meta<typeof TooltipAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="pt-10 pl-10">
      <TooltipAtom {...args} />
    </div>
  ),
};

export const Posicoes: Story = {
  render: () => (
    <div className="flex items-center gap-16 py-16 px-16">
      <TooltipAtom content="Top" placement="top">
        <button className="px-3 py-1.5 text-sm rounded-lg border border-background-stroke">Top</button>
      </TooltipAtom>
      <TooltipAtom content="Bottom" placement="bottom">
        <button className="px-3 py-1.5 text-sm rounded-lg border border-background-stroke">Bottom</button>
      </TooltipAtom>
      <TooltipAtom content="Left" placement="left">
        <button className="px-3 py-1.5 text-sm rounded-lg border border-background-stroke">Left</button>
      </TooltipAtom>
      <TooltipAtom content="Right" placement="right">
        <button className="px-3 py-1.5 text-sm rounded-lg border border-background-stroke">Right</button>
      </TooltipAtom>
    </div>
  ),
};
