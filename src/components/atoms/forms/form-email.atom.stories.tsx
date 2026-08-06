import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormEmailAtom } from "./form-email.atom";

const meta = {
  title: "Atoms/Forms/FormEmailAtom",
  component: FormEmailAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormEmailAtom } from "componentes-react";\n```',
      },
    },
  },
} satisfies Meta<typeof FormEmailAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormEmailAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { email: "" } });
  return (
    <div className="w-72">
      <FormEmailAtom control={control} name="email" {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <FormFieldDemo placeholder="voce@exemplo.com" />,
};

export const Invalido: Story = {
  args: {} as any,
  render: () => <FormFieldDemo placeholder="voce@exemplo.com" isInvalid />,
};
