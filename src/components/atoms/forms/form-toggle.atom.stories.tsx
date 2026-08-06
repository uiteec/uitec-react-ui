import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormToggleAtom } from "./form-toggle.atom";

const meta = {
  title: "Atoms/Forms/FormToggleAtom",
  component: FormToggleAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormToggleAtom } from "componentes-react";\n```',
      },
    },
  },
  args: {
    labelItem: "Notificações por e-mail",
    description: "Receba um resumo diário das atividades.",
  },
} satisfies Meta<typeof FormToggleAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormToggleAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { notificacoes: true } });
  return <FormToggleAtom control={control} name="notificacoes" {...props} />;
}

export const Default: Story = {
  args: {} as any,
  render: (args) => <FormFieldDemo {...args} />,
};
