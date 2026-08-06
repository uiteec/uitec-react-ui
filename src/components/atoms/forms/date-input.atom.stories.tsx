import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateInputAtom } from "./date-input.atom";

const meta = {
  title: "Atoms/Forms/DateInputAtom",
  component: DateInputAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { DateInputAtom } from "componentes-react";\n```',
      },
    },
  },
  args: {
    placeholder: "DD/MM/AAAA",
  },
} satisfies Meta<typeof DateInputAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function DateInputDemo(props: Omit<React.ComponentProps<typeof DateInputAtom>, "value" | "onChange">) {
  const [value, setValue] = useState("");
  return (
    <div className="w-56">
      <DateInputAtom value={value} onChange={setValue} {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: (args) => <DateInputDemo {...args} />,
};

export const Desabilitado: Story = {
  args: { disabled: true } as any,
  render: (args) => <DateInputDemo {...args} />,
};
