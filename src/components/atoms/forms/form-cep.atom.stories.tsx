import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { FormCEPAtom } from "./form-cep.atom";

const meta = {
  title: "Atoms/Forms/FormCEPAtom",
  component: FormCEPAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormCEPAtom } from "uitec-react-ui";\n```',
      },
    },
  },
} satisfies Meta<typeof FormCEPAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormFieldDemo(props: Omit<ComponentProps<typeof FormCEPAtom>, "control" | "name">) {
  const { control } = useForm<any>({ defaultValues: { cep: "" } });
  return (
    <div className="w-72">
      <FormCEPAtom control={control} name="cep" {...props} />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <FormFieldDemo />,
};

export const ComBuscar: Story = {
  args: {} as any,
  render: () => <FormFieldDemo onSearchPress={() => alert("Buscar CEP")} />,
};
