import { Button, Stack, Typography } from "@mui/material";
import GlassCard from "./GlassCard";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <GlassCard sx={{ p: { xs: 3, md: 4 }, textAlign: "center" }}>
      <Stack spacing={1.5} alignItems="center">
        <Typography variant="h3">{title}</Typography>
        <Typography variant="body2" sx={{ maxWidth: 420 }}>
          {description}
        </Typography>
        {actionLabel && onAction && (
          <Button variant="contained" onClick={onAction} sx={{ mt: 1 }}>
            {actionLabel}
          </Button>
        )}
      </Stack>
    </GlassCard>
  );
};

export default EmptyState;
