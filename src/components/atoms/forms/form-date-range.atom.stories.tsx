import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormDateRangeAtom, type DateRangeValue } from "./form-date-range.atom";

const meta = {
  title: "Atoms/Forms/FormDateRangeAtom",
  component: FormDateRangeAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormDateRangeAtom } from "uitec-react-ui";\n```',
      },
    },
  },
} satisfies Meta<typeof FormDateRangeAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormDateRangeAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { periodo: {} as DateRangeValue } });
  return (
    <div className="w-96">
      <FormDateRangeAtom control={control} name="periodo" {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <FormFieldDemo />,
};
