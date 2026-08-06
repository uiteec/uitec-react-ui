import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormPasswordAtom } from "./form-password.atom";

const meta = {
  title: "Atoms/Forms/FormPasswordAtom",
  component: FormPasswordAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormPasswordAtom } from "componentes-react";\n```',
      },
    },
  },
} satisfies Meta<typeof FormPasswordAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormPasswordAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { senha: "" } });
  return (
    <div className="w-72">
      <FormPasswordAtom control={control} name="senha" {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <FormFieldDemo placeholder="Digite sua senha" />,
};

export const Invalido: Story = {
  args: {} as any,
  render: () => <FormFieldDemo placeholder="Digite sua senha" isInvalid />,
};
