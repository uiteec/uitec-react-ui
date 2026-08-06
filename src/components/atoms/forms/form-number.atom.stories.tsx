import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormNumberAtom } from "./form-number.atom";

const meta = {
  title: "Atoms/Forms/FormNumberAtom",
  component: FormNumberAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormNumberAtom } from "componentes-react";\n```',
      },
    },
  },
} satisfies Meta<typeof FormNumberAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormNumberAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { quantidade: "" } });
  return (
    <div className="w-72">
      <FormNumberAtom control={control} name="quantidade" {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <FormFieldDemo placeholder="0" />,
};

export const Invalido: Story = {
  args: {} as any,
  render: () => <FormFieldDemo placeholder="0" isInvalid />,
};
