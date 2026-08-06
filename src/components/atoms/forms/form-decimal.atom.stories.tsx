import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormDecimalAtom } from "./form-decimal.atom";

const meta = {
  title: "Atoms/Forms/FormDecimalAtom",
  component: FormDecimalAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormDecimalAtom } from "componentes-react";\n```',
      },
    },
  },
} satisfies Meta<typeof FormDecimalAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormDecimalAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { peso: "" } });
  return (
    <div className="w-72">
      <FormDecimalAtom control={control} name="peso" {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <FormFieldDemo />,
};
