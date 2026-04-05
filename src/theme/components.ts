import { alpha, type Components, type Theme } from "@mui/material/styles";

export const getComponentOverrides = (theme: Theme): Components<Theme> => ({
  MuiCssBaseline: {
    styleOverrides: {
      "html, body, #root": {
        minHeight: "100%",
      },
      body: {
        backgroundImage: `
          radial-gradient(circle at 10% -20%, ${alpha(theme.palette.primary.main, 0.28)} 0%, transparent 45%),
          radial-gradient(circle at 90% 0%, ${alpha(theme.palette.info.main, 0.2)} 0%, transparent 35%),
          linear-gradient(145deg, ${theme.palette.background.default} 0%, ${theme.palette.surface.level1} 100%)
        `,
        color: theme.palette.text.primary,
      },
      "*::-webkit-scrollbar": {
        width: 8,
        height: 8,
      },
      "*::-webkit-scrollbar-track": {
        backgroundColor: alpha(theme.palette.common.white, 0.03),
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: alpha(theme.palette.common.white, 0.16),
        borderRadius: 999,
      },
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        backgroundImage: "none",
        border: `1px solid ${theme.palette.border.subtle}`,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "18px",
        textTransform: "none",
        fontWeight: 600,
        letterSpacing: "0.02em",
        transition:
          "transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease",
      },
      contained: {
        boxShadow: `0 10px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: `0 14px 28px ${alpha(theme.palette.primary.main, 0.36)}`,
        },
      },
      outlined: {
        borderColor: theme.palette.border.strong,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 999,
        border: `1px solid ${theme.palette.border.subtle}`,
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        backdropFilter: theme.palette.glass.blur,
        backgroundColor: theme.palette.glass.backgroundStrong,
        border: `1px solid ${theme.palette.glass.borderStrong}`,
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        backdropFilter: "blur(16px)",
        backgroundColor: alpha(theme.palette.background.paper, 0.92),
        borderColor: theme.palette.border.subtle,
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      size: "small",
      variant: "outlined",
    },
  },
});
