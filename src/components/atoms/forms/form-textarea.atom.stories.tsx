import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormTextareaAtom } from "./form-textarea.atom";

const meta = {
  title: "Atoms/Forms/FormTextareaAtom",
  component: FormTextareaAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormTextareaAtom } from "componentes-react";\n```',
      },
    },
  },
} satisfies Meta<typeof FormTextareaAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormTextareaAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { descricao: "" } });
  return (
    <div className="w-96">
      <FormTextareaAtom control={control} name="descricao" {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <FormFieldDemo placeholder="Escreva uma descrição..." />,
};

export const ComContador: Story = {
  args: {} as any,
  render: () => <FormFieldDemo placeholder="Escreva uma descrição..." maxLength={140} />,
};
