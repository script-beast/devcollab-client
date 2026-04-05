import { Box, Container, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { ReactNode } from "react";
import GlassCard from "../common/GlassCard";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

const featureLines = [
  "Issue triage with contextual drawer workflows",
  "Project-level dashboards with developer-first metrics",
  "Reusable design tokens and scalable component architecture",
];

const AuthShell = ({ eyebrow, title, description, children, footer }: AuthShellProps) => {
  return (
    <Box sx={{ minHeight: "100vh", display: "grid", alignItems: "center", py: { xs: 3, md: 6 }, px: 2 }}>
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", md: "1fr 1.1fr" },
            alignItems: "stretch",
          }}
        >
          <GlassCard
            sx={{
              p: 3,
              display: { xs: "none", md: "grid" },
              alignContent: "space-between",
              background: (theme) =>
                `linear-gradient(155deg, ${alpha(theme.palette.primary.main, 0.24)} 0%, ${alpha(
                  theme.palette.info.main,
                  0.18,
                )} 100%)`,
            }}
          >
            <Box>
              <Typography variant="overline" sx={{ letterSpacing: "0.12em", color: "text.secondary" }}>
                DevCollab Access
              </Typography>
              <Typography variant="h2" sx={{ mt: 1 }}>
                Build with velocity.
                <br />
                Collaborate with clarity.
              </Typography>
            </Box>

            <Stack spacing={1.3} sx={{ mt: 3 }}>
              {featureLines.map((line) => (
                <Typography key={line} variant="body2" sx={{ color: "text.primary" }}>
                  {line}
                </Typography>
              ))}
            </Stack>
          </GlassCard>

          <GlassCard sx={{ p: { xs: 2.4, md: 3.2 }, display: "grid", gap: 2 }}>
            <Box>
              <Typography variant="overline" sx={{ letterSpacing: "0.12em", color: "text.secondary" }}>
                {eyebrow}
              </Typography>
              <Typography variant="h2" sx={{ mt: 0.5 }}>
                {title}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {description}
              </Typography>
            </Box>

            {children}

            <Box>{footer}</Box>
          </GlassCard>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthShell;
