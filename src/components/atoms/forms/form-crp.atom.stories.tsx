import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormCRPAtom } from "./form-crp.atom";

const meta = {
  title: "Atoms/Forms/FormCRPAtom",
  component: FormCRPAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormCRPAtom } from "uitec-react-ui";\n```',
      },
    },
  },
} satisfies Meta<typeof FormCRPAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormCRPAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { crp: "" } });
  return (
    <div className="w-72">
      <FormCRPAtom control={control} name="crp" {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <FormFieldDemo />,
};
