import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

const PageHeader = ({ eyebrow, title, description, actions }: PageHeaderProps) => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={{ xs: "flex-start", md: "center" }}
      justifyContent="space-between"
      spacing={2}
    >
      <Box>
        {eyebrow && (
          <Typography
            variant="overline"
            sx={(theme) => ({
              letterSpacing: "0.14em",
              color: theme.palette.text.secondary,
            })}
          >
            {eyebrow}
          </Typography>
        )}
        <Typography variant="h2">{title}</Typography>
        {description && (
          <Typography variant="subtitle1" sx={{ mt: 0.75, maxWidth: 760 }}>
            {description}
          </Typography>
        )}
      </Box>
      {actions}
    </Stack>
  );
};

export default PageHeader;
