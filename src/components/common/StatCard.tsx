import { Typography } from "@mui/material";
import { alpha, type Theme } from "@mui/material/styles";
import GlassCard from "./GlassCard";

type StatTone = "primary" | "success" | "warning" | "danger";

interface StatCardProps {
  label: string;
  value: string | number;
  helperText?: string;
  tone?: StatTone;
}

const StatCard = ({
  label,
  value,
  helperText,
  tone = "primary",
}: StatCardProps) => {
  const resolveTone = (theme: Theme): string => {
    if (tone === "success") {
      return theme.palette.success.main;
    }

    if (tone === "warning") {
      return theme.palette.warning.main;
    }

    if (tone === "danger") {
      return theme.palette.error.main;
    }

    return theme.palette.primary.main;
  };

  return (
    <GlassCard
      sx={(theme) => {
        const toneColor = resolveTone(theme);

        return {
          p: 2.25,
          borderColor: alpha(toneColor, 0.4),
          backgroundColor: alpha(toneColor, 0.1),
        };
      }}
    >
      <Typography variant="overline" sx={{ color: "text.secondary" }}>
        {label}
      </Typography>
      <Typography variant="h3" sx={{ mt: 0.2 }}>
        {value}
      </Typography>
      {helperText && (
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          {helperText}
        </Typography>
      )}
    </GlassCard>
  );
};

export default StatCard;
