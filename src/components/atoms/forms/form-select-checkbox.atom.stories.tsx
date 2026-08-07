import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormSelectCheckboxAtom, type CheckboxOption } from "./form-select-checkbox.atom";

const options: CheckboxOption[] = [
  { label: "Segunda", value: "seg" },
  { label: "Terça", value: "ter" },
  { label: "Quarta", value: "qua" },
  { label: "Quinta", value: "qui" },
  { label: "Sexta", value: "sex" },
];

const meta = {
  title: "Atoms/Forms/FormSelectCheckboxAtom",
  component: FormSelectCheckboxAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormSelectCheckboxAtom } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    options,
    placeholder: "Selecione os dias",
  },
} satisfies Meta<typeof FormSelectCheckboxAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormSelectCheckboxAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { dias: [] as (string | number)[] } });
  return (
    <div className="w-72">
      <FormSelectCheckboxAtom control={control} name="dias" {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: (args) => <FormFieldDemo {...args} />,
};
