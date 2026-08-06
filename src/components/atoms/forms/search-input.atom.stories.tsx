import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SearchInputAtom } from "./search-input.atom";

const meta = {
  title: "Atoms/Forms/SearchInputAtom",
  component: SearchInputAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { SearchInputAtom } from "componentes-react";\n```',
      },
    },
  },
  args: {
    placeholder: "Buscar…",
  },
} satisfies Meta<typeof SearchInputAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function SearchDemo(props: Omit<React.ComponentProps<typeof SearchInputAtom>, "value" | "onChange">) {
  const [value, setValue] = useState("");
  return (
    <div className="w-72">
      <SearchInputAtom value={value} onChange={setValue} {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: (args) => <SearchDemo {...args} />,
};
