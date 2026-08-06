import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./dialog";
import { ButtonAtom } from "@/components/atoms/buttons";

const meta = {
  title: "UI/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          '```tsx\nimport {\n  Dialog,\n  DialogTrigger,\n  DialogContent,\n  DialogHeader,\n  DialogTitle,\n  DialogDescription,\n  DialogFooter,\n  DialogClose,\n} from "componentes-react";\n```\n\nPrimitiva de diálogo modal baseada em Radix UI, no padrão shadcn.',
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonAtom text="Abrir diálogo" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>
            Atualize as informações do seu perfil. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <ButtonAtom variant="outline" text="Cancelar" />
          </DialogClose>
          <ButtonAtom text="Salvar" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
