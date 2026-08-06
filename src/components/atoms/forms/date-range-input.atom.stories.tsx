import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateRangeInputAtom, type DateRangeInputValue } from "./date-range-input.atom";

const meta = {
  title: "Atoms/Forms/DateRangeInputAtom",
  component: DateRangeInputAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { DateRangeInputAtom } from "componentes-react";\n```',
      },
    },
  },
  args: {
    label: "Período",
  },
} satisfies Meta<typeof DateRangeInputAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function DateRangeDemo(props: Omit<React.ComponentProps<typeof DateRangeInputAtom>, "value" | "onChange">) {
  const [value, setValue] = useState<DateRangeInputValue>({ de: "", ate: "" });
  return (
    <div className="w-96">
      <DateRangeInputAtom value={value} onChange={setValue} {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: (args) => <DateRangeDemo {...args} />,
};
