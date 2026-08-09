import type { Meta, StoryObj } from "@storybook/react";
import { BrandCheckAtom } from "./brand-check.atom";

const meta = {
  title: "Atoms/Decorative/BrandCheckAtom",
  component: BrandCheckAtom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '```tsx\nimport { BrandCheckAtom } from "uitec-react-ui";\n```',
      },
    },
  },
  args: {
    size: 112,
  },
} satisfies Meta<typeof BrandCheckAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
