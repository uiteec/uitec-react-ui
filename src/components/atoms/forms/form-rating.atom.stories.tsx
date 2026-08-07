import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormRatingAtom } from "./form-rating.atom";

const meta = {
  title: "Atoms/Forms/FormRatingAtom",
  component: FormRatingAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormRatingAtom } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    size: 24,
  },
} satisfies Meta<typeof FormRatingAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormRatingAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { nota: 3 } });
  return <FormRatingAtom control={control} name="nota" {...props} />;
}

export const Default: Story = {
  args: {} as any,
  render: (args) => <FormFieldDemo {...args} />,
};
