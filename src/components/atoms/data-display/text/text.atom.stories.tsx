import type { Meta, StoryObj } from "@storybook/react";
import { TextAtom } from "./text.atom";

const meta = {
  title: "Atoms/DataDisplay/TextAtom",
  component: TextAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { TextAtom } from "componentes-react";\n```',
      },
    },
  },
  args: {
    variant: "body",
    color: "default",
    children: "O rato roeu a roupa do rei de Roma.",
  },
} satisfies Meta<typeof TextAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variantes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <TextAtom variant="h1">Título H1</TextAtom>
      <TextAtom variant="h2">Título H2</TextAtom>
      <TextAtom variant="h3">Título H3</TextAtom>
      <TextAtom variant="h4">Título H4</TextAtom>
      <TextAtom variant="body">Texto de corpo (body)</TextAtom>
      <TextAtom variant="body-sm">Texto de corpo pequeno (body-sm)</TextAtom>
      <TextAtom variant="caption">Legenda (caption)</TextAtom>
      <TextAtom variant="label">Rótulo (label)</TextAtom>
      <TextAtom variant="overline">Overline</TextAtom>
    </div>
  ),
};

export const Cores: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      <TextAtom color="default">default</TextAtom>
      <TextAtom color="secondary">secondary</TextAtom>
      <TextAtom color="disabled">disabled</TextAtom>
      <TextAtom color="primary">primary</TextAtom>
      <TextAtom color="error">error</TextAtom>
      <TextAtom color="success">success</TextAtom>
    </div>
  ),
};
