import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "./scroll-area";

const meta = {
  title: "UI/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { ScrollArea } from "uitec-react-ui";\n```',
      },
    },
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-48 w-64 rounded-lg border border-background-stroke p-4">
      <div className="flex flex-col gap-3">
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="text-sm text-font-default">
            Item da lista {i + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};
