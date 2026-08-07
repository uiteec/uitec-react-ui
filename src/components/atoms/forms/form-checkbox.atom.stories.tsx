import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormCheckboxAtom } from "./form-checkbox.atom";

const meta = {
  title: "Atoms/Forms/FormCheckboxAtom",
  component: FormCheckboxAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormCheckboxAtom } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    labelItem: "Aceito os termos de uso",
  },
} satisfies Meta<typeof FormCheckboxAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormCheckboxAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { aceite: false } });
  return <FormCheckboxAtom control={control} name="aceite" {...props} />;
}

export const Default: Story = {
  args: {} as any,
  render: (args) => <FormFieldDemo {...args} />,
};
