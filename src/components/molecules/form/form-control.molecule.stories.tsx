import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormControlMolecule, type IFormSchema } from "./form-control.molecule";

const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").max(60),
  email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
});

const meta = {
  title: "Molecules/Form/FormControlMolecule",
  component: FormControlMolecule,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { FormControlMolecule } from "uitec-react-ui";\n```',
      },
    },
  },
} satisfies Meta<typeof FormControlMolecule>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormControlDemo() {
  const hookForm = useForm<z.infer<typeof schema>>({
    defaultValues: { nome: "", email: "" },
  });
  const form: IFormSchema<typeof schema> = { form: hookForm, schema };

  return (
    <div className="flex w-80 flex-col gap-4">
      <FormControlMolecule form={form} name="nome" type="text" label="Nome" placeholder="Digite seu nome" />
      <FormControlMolecule form={form} name="email" type="email" label="E-mail" placeholder="voce@exemplo.com" />
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <FormControlDemo />,
};
