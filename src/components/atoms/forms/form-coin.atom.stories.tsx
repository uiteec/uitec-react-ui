import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormCoinAtom } from "./form-coin.atom";

const meta = {
  title: "Atoms/Forms/FormCoinAtom",
  component: FormCoinAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormCoinAtom } from "componentes-react";\n```',
      },
    },
  },
} satisfies Meta<typeof FormCoinAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormCoinAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { valor: "" } });
  return (
    <div className="w-72">
      <FormCoinAtom control={control} name="valor" {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <FormFieldDemo />,
};
