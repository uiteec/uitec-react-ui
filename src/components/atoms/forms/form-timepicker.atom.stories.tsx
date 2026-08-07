import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormTimepickerAtom } from "./form-timepicker.atom";

const meta = {
  title: "Atoms/Forms/FormTimepickerAtom",
  component: FormTimepickerAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormTimepickerAtom } from "uitec-react-ui";\n```',
      },
    },
  },
} satisfies Meta<typeof FormTimepickerAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormTimepickerAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { hora: "" } });
  return (
    <div className="w-72">
      <FormTimepickerAtom control={control} name="hora" {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <FormFieldDemo />,
};
