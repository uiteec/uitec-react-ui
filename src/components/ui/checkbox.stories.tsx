import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./checkbox";

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { Checkbox } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    disabled: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

function CheckboxDemo(props: React.ComponentProps<typeof Checkbox>) {
  const [checked, setChecked] = useState<boolean>(!!props.checked);
  return <Checkbox {...props} checked={checked} onCheckedChange={(v) => setChecked(!!v)} />;
}

export const Default: Story = {
  render: (args) => <CheckboxDemo {...args} />,
};

export const Marcado: Story = {
  args: { checked: true },
  render: (args) => <CheckboxDemo {...args} />,
};

export const Desabilitado: Story = {
  args: { disabled: true },
  render: (args) => <CheckboxDemo {...args} />,
};
