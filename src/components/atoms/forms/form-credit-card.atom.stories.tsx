import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormCreditCardAtom } from "./form-credit-card.atom";

const meta = {
  title: "Atoms/Forms/FormCreditCardAtom",
  component: FormCreditCardAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormCreditCardAtom } from "componentes-react";\n```',
      },
    },
  },
} satisfies Meta<typeof FormCreditCardAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormCreditCardAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { cartao: "" } });
  return (
    <div className="w-72">
      <FormCreditCardAtom control={control} name="cartao" {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <FormFieldDemo />,
};
