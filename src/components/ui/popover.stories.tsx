import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { ButtonAtom } from "@/components/atoms/buttons";

const meta = {
  title: "UI/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          '```tsx\nimport { Popover, PopoverTrigger, PopoverContent } from "componentes-react";\n```\n\nPrimitiva de popover baseada em Radix UI, no padrão shadcn.',
      },
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonAtom text="Abrir popover" variant="outline" />
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm font-semibold text-font-default">Dimensões</p>
        <p className="mt-1 text-sm text-font-vector">
          Configure as dimensões do elemento selecionado.
        </p>
      </PopoverContent>
    </Popover>
  ),
};
