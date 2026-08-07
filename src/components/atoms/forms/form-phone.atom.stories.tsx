import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormPhoneAtom } from "./form-phone.atom";

const meta = {
  title: "Atoms/Forms/FormPhoneAtom",
  component: FormPhoneAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormPhoneAtom } from "uitec-react-ui";\n```',
      },
    },
  },
} satisfies Meta<typeof FormPhoneAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormPhoneAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { telefone: "" } });
  return (
    <div className="w-72">
      <FormPhoneAtom control={control} name="telefone" {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <FormFieldDemo />,
};
