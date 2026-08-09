import { addons } from "storybook/internal/manager-api";
import { create } from "storybook/internal/theming/create";
import pkg from "../package.json";

const theme = create({
  base: "dark",
  brandTitle: `uitec-react-ui v${pkg.version}`,
});

addons.setConfig({
  panelPosition: "right",
  theme,
});
