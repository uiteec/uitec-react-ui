import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormRadioAtom, type RadioOption } from "./form-radio.atom";

const options: RadioOption[] = [
  { label: "Cartão de crédito", value: "credito" },
  { label: "Boleto", value: "boleto" },
  { label: "Pix", value: "pix" },
];

const meta = {
  title: "Atoms/Forms/FormRadioAtom",
  component: FormRadioAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormRadioAtom } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    options,
    inline: false,
  },
} satisfies Meta<typeof FormRadioAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormRadioAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { pagamento: "pix" } });
  return <FormRadioAtom control={control} name="pagamento" {...props} />;
}

export const Default: Story = {
  args: {} as any,
  render: (args) => <FormFieldDemo {...args} />,
};

export const Inline: Story = {
  args: { inline: true } as any,
  render: (args) => <FormFieldDemo {...args} />,
};
