import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormCodeInputAtom } from "./form-code-input.atom";

const meta = {
  title: "Atoms/Forms/FormCodeInputAtom",
  component: FormCodeInputAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormCodeInputAtom } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    length: 4,
  },
} satisfies Meta<typeof FormCodeInputAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormCodeInputAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { codigo: "" } });
  return <FormCodeInputAtom control={control} name="codigo" {...props} />;
}

export const Default: Story = {
  args: {} as any,
  render: (args) => <FormFieldDemo {...args} />,
};

export const SeisDigitos: Story = {
  args: { length: 6 } as any,
  render: (args) => <FormFieldDemo {...args} />,
};
