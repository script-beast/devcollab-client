import { alpha, type PaletteOptions } from "@mui/material/styles";

export const paletteTokens = {
  background: {
    default: "#060B16",
    paper: "#0E1628",
  },
  surface: {
    level1: "#101B31",
    level2: "#172440",
    level3: "#1F2F4F",
  },
  glass: {
    background: alpha("#132341", 0.62),
    backgroundStrong: alpha("#1B2E54", 0.76),
    border: alpha("#DEE8FF", 0.16),
    borderStrong: alpha("#DEE8FF", 0.3),
    blur: "blur(18px)",
  },
  text: {
    primary: "#F4F8FF",
    secondary: "#95A7C6",
  },
  border: {
    subtle: alpha("#E2EBFF", 0.15),
    strong: alpha("#E2EBFF", 0.3),
  },
  accent: {
    primary: "#7396FF",
    secondary: "#4BD9C4",
    info: "#7E78FF",
    warning: "#F8BB5D",
    danger: "#FF6F8F",
  },
} as const;

export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: paletteTokens.accent.primary,
    light: "#9AB3FF",
    dark: "#4B68D8",
    contrastText: paletteTokens.text.primary,
  },
  secondary: {
    main: paletteTokens.accent.secondary,
    light: "#88E8D9",
    dark: "#21A38E",
    contrastText: "#0A1629",
  },
  info: {
    main: paletteTokens.accent.info,
  },
  warning: {
    main: paletteTokens.accent.warning,
  },
  error: {
    main: paletteTokens.accent.danger,
  },
  success: {
    main: "#4EC98A",
  },
  background: {
    default: paletteTokens.background.default,
    paper: paletteTokens.background.paper,
  },
  text: {
    primary: paletteTokens.text.primary,
    secondary: paletteTokens.text.secondary,
  },
  divider: paletteTokens.border.subtle,
};
