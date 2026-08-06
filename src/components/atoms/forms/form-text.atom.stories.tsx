import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormTextAtom } from "./form-text.atom";

const meta = {
  title: "Atoms/Forms/FormTextAtom",
  component: FormTextAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormTextAtom } from "componentes-react";\n```',
      },
    },
  },
} satisfies Meta<typeof FormTextAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormTextAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { nome: "" } });
  return (
    <div className="w-72">
      <FormTextAtom control={control} name="nome" {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <FormFieldDemo placeholder="Digite seu nome" />,
};

export const Invalido: Story = {
  args: {} as any,
  render: () => <FormFieldDemo placeholder="Digite seu nome" isInvalid />,
};

export const Desabilitado: Story = {
  args: {} as any,
  render: () => <FormFieldDemo placeholder="Digite seu nome" disabled />,
};
