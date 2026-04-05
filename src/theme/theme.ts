import { createTheme, type Shadows } from "@mui/material/styles";
import { getComponentOverrides } from "./components";
import { darkPalette, paletteTokens } from "./palette";

declare module "@mui/material/styles" {
  interface Palette {
    surface: {
      level1: string;
      level2: string;
      level3: string;
    };
    glass: {
      background: string;
      backgroundStrong: string;
      border: string;
      borderStrong: string;
      blur: string;
    };
    border: {
      subtle: string;
      strong: string;
    };
    accent: {
      primary: string;
      secondary: string;
      info: string;
      warning: string;
      danger: string;
    };
  }

  interface PaletteOptions {
    surface?: {
      level1: string;
      level2: string;
      level3: string;
    };
    glass?: {
      background: string;
      backgroundStrong: string;
      border: string;
      borderStrong: string;
      blur: string;
    };
    border?: {
      subtle: string;
      strong: string;
    };
    accent?: {
      primary: string;
      secondary: string;
      info: string;
      warning: string;
      danger: string;
    };
  }
}

const createShadows = (): Shadows => {
  const generated = Array.from({ length: 25 }, (_, index) => {
    if (index === 0) {
      return "none";
    }

    const y = Math.round(index * 1.5);
    const blur = Math.round(index * 3.4);
    const alpha = Math.min(0.16 + index * 0.012, 0.5);

    return `0 ${y}px ${blur}px rgba(2, 8, 20, ${alpha})`;
  });

  return generated as Shadows;
};

const baseTheme = createTheme({
  palette: {
    ...darkPalette,
    surface: paletteTokens.surface,
    glass: paletteTokens.glass,
    border: paletteTokens.border,
    accent: paletteTokens.accent,
  },
  spacing: 8,
  shape: {
    borderRadius: 18,
  },
  shadows: createShadows(),
  typography: {
    fontFamily: '"Sora", "IBM Plex Sans", "Segoe UI", sans-serif',
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "1.55rem",
      fontWeight: 650,
      lineHeight: 1.3,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontSize: "1.2rem",
      fontWeight: 620,
      lineHeight: 1.3,
    },
    subtitle1: {
      fontSize: "0.96rem",
      lineHeight: 1.6,
      color: paletteTokens.text.secondary,
    },
    body1: {
      fontSize: "0.96rem",
      lineHeight: 1.65,
    },
    body2: {
      fontSize: "0.88rem",
      lineHeight: 1.6,
      color: paletteTokens.text.secondary,
    },
    button: {
      fontWeight: 600,
      fontSize: "0.86rem",
    },
  },
});

const theme = createTheme(baseTheme, {
  components: getComponentOverrides(baseTheme),
});

export default theme;
