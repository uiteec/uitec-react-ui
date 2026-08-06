import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormUploadAtom } from "./form-upload.atom";

const meta = {
  title: "Atoms/Forms/FormUploadAtom",
  component: FormUploadAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormUploadAtom } from "componentes-react";\n```',
      },
    },
  },
  args: {
    variant: "full",
    multiple: false,
    maxFiles: 1,
  },
} satisfies Meta<typeof FormUploadAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormUploadAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { arquivo: null } });
  return (
    <div className="w-80">
      <FormUploadAtom control={control} name="arquivo" {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: (args) => <FormFieldDemo {...args} />,
};

export const Compacto: Story = {
  args: { variant: "compact" } as any,
  render: (args) => <FormFieldDemo {...args} />,
};
