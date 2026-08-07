import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormDateAtom } from "./form-date.atom";

const meta = {
  title: "Atoms/Forms/FormDateAtom",
  component: FormDateAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormDateAtom } from "uitec-react-ui";\n```',
      },
    },
  },
} satisfies Meta<typeof FormDateAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormDateAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { data: "" } });
  return (
    <div className="w-72">
      <FormDateAtom control={control} name="data" {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <FormFieldDemo />,
};

export const MesEAno: Story = {
  args: {} as any,
  render: () => <FormFieldDemo monthAndYear />,
};
