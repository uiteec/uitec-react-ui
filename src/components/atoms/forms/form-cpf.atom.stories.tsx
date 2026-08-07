import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormCPFAtom } from "./form-cpf.atom";

const meta = {
  title: "Atoms/Forms/FormCPFAtom",
  component: FormCPFAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormCPFAtom } from "uitec-react-ui";\n```',
      },
    },
  },
} satisfies Meta<typeof FormCPFAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormCPFAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { cpf: "" } });
  return (
    <div className="w-72">
      <FormCPFAtom control={control} name="cpf" {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <FormFieldDemo />,
};
