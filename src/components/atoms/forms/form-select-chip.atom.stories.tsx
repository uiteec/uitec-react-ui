import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormSelectChipAtom, type ChipOption } from "./form-select-chip.atom";

const options: ChipOption[] = [
  { label: "Urgente", value: "urgente" },
  { label: "Importante", value: "importante" },
  { label: "Backlog", value: "backlog" },
];

const meta = {
  title: "Atoms/Forms/FormSelectChipAtom",
  component: FormSelectChipAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormSelectChipAtom } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    options,
    placeholder: "Selecione as tags",
  },
} satisfies Meta<typeof FormSelectChipAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormSelectChipAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { tags: [] as (string | number)[] } });
  return (
    <div className="w-72">
      <FormSelectChipAtom control={control} name="tags" {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: (args) => <FormFieldDemo {...args} />,
};
