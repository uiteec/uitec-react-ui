import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormCNPJAtom } from "./form-cnpj.atom";

const meta = {
  title: "Atoms/Forms/FormCNPJAtom",
  component: FormCNPJAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormCNPJAtom } from "uitec-react-ui";\n```',
      },
    },
  },
} satisfies Meta<typeof FormCNPJAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormCNPJAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { cnpj: "" } });
  return (
    <div className="w-72">
      <FormCNPJAtom control={control} name="cnpj" {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <FormFieldDemo />,
};
