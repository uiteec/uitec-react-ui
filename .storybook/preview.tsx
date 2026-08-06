import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import "../src/styles/tokens.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
  },
  decorators: [
    withThemeByClassName({
      themes: { claro: "", escuro: "dark" },
      defaultTheme: "claro",
    }),
    (Story) => (
      <div style={{ padding: "1.5rem", background: "var(--background-page)", minHeight: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
