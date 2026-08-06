import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormSelectAtom, type SelectOption } from "./form-select.atom";

const options: SelectOption[] = [
  { label: "São Paulo", value: "sp" },
  { label: "Rio de Janeiro", value: "rj" },
  { label: "Minas Gerais", value: "mg" },
];

const meta = {
  title: "Atoms/Forms/FormSelectAtom",
  component: FormSelectAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormSelectAtom } from "componentes-react";\n```',
      },
    },
  },
  args: {
    options,
    placeholder: "Selecione um estado",
  },
} satisfies Meta<typeof FormSelectAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormSelectAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { estado: "" } });
  return (
    <div className="w-72">
      <FormSelectAtom control={control} name="estado" {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: (args) => <FormFieldDemo {...args} />,
};
