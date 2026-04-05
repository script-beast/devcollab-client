import { Paper, type PaperProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";

interface GlassCardProps extends PaperProps {
  hoverable?: boolean;
}

const GlassCard = ({ children, hoverable = false, sx, ...paperProps }: GlassCardProps) => {
  const composedSx = (theme: Theme) => {
    const baseStyles: Record<string, unknown> = {
      position: "relative",
      borderRadius: "18px",
      border: `1px solid ${theme.palette.glass.border}`,
      backgroundColor: theme.palette.glass.background,
      backdropFilter: theme.palette.glass.blur,
      boxShadow: theme.shadows[6],
      transition:
        "transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
      ...(hoverable && {
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: theme.palette.glass.borderStrong,
          boxShadow: theme.shadows[10],
        },
      }),
    };

    if (!sx) {
      return baseStyles;
    }

    if (typeof sx === "function") {
      return {
        ...baseStyles,
        ...(sx(theme) as Record<string, unknown>),
      };
    }

    if (Array.isArray(sx)) {
      return sx.reduce<Record<string, unknown>>((accumulator, styleChunk) => {
        if (!styleChunk) {
          return accumulator;
        }

        if (typeof styleChunk === "function") {
          return {
            ...accumulator,
            ...(styleChunk(theme) as Record<string, unknown>),
          };
        }

        return {
          ...accumulator,
          ...(styleChunk as Record<string, unknown>),
        };
      }, baseStyles);
    }

    return {
      ...baseStyles,
      ...(sx as Record<string, unknown>),
    };
  };

  return (
    <Paper {...paperProps} sx={composedSx}>
      {children}
    </Paper>
  );
};

export default GlassCard;
