import type { Meta, StoryObj } from "@storybook/react";
import { MarkdownTextoAtom } from "./markdown-texto.atom";

const meta = {
  title: "Atoms/DataDisplay/MarkdownTextoAtom",
  component: MarkdownTextoAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { MarkdownTextoAtom } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    texto: [
      "## Título",
      "",
      "Texto **em negrito** e *em itálico*, com [um link](https://example.com).",
      "",
      "- Item de lista",
      "- Outro item",
      "",
      "> Uma citação em destaque.",
    ].join("\n"),
  },
} satisfies Meta<typeof MarkdownTextoAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tabela: Story = {
  args: {
    texto: [
      "| Coluna A | Coluna B |",
      "| --- | --- |",
      "| valor 1 | valor 2 |",
      "| valor 3 | valor 4 |",
    ].join("\n"),
  },
};
