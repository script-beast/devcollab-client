import { Box, Chip, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  FiFolder,
  FiKey,
  FiMessageSquare,
  FiTarget,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import GlassCard from "../common/GlassCard";
import PageHeader from "../common/PageHeader";

interface WorkflowStep {
  title: string;
  line: string;
  icon: IconType;
}

const workflowSteps: WorkflowStep[] = [
  {
    title: "Authenticate",
    line: "JWT login and register flows unlock protected workspace routes.",
    icon: FiKey,
  },
  {
    title: "Structure projects",
    line: "Track progress, members, issue counts, and project state in one hub.",
    icon: FiFolder,
  },
  {
    title: "Move issues forward",
    line: "Drive work from todo to in-progress to closed with clear ownership.",
    icon: FiTarget,
  },
  {
    title: "Collaborate by role",
    line: "Admin, member, and viewer permissions keep teamwork organized.",
    icon: FiMessageSquare,
  },
];

const AboutSection = () => {
  return (
    <Box component="section" id="about" sx={{ display: "grid", gap: 1.6 }}>
      <PageHeader
        eyebrow="About DevCollab"
        title="Workflows built for shipping teams"
        description="Simple flow, strong ownership, faster delivery."
      />

      <Box
        sx={{
          display: "grid",
          gap: 1.1,
          gridTemplateColumns: {
            xs: "1fr",
            lg: "repeat(2, minmax(0, 1fr))",
          },
        }}
      >
        {workflowSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <GlassCard
              key={step.title}
              hoverable
              sx={{ p: 1.5, display: "grid", gap: 0.9 }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Chip
                  size="small"
                  label={`0${index + 1}`}
                  sx={(theme) => ({
                    color: theme.palette.info.light,
                    borderColor: alpha(theme.palette.info.main, 0.42),
                    backgroundColor: alpha(theme.palette.info.main, 0.16),
                  })}
                />
                <Box
                  sx={(theme) => ({
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    color: theme.palette.secondary.main,
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.46)}`,
                    backgroundColor: alpha(theme.palette.secondary.main, 0.15),
                  })}
                >
                  <Icon size={14} />
                </Box>
              </Stack>

              <Typography variant="h3" sx={{ fontSize: "1rem" }}>
                {step.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {step.line}
              </Typography>
            </GlassCard>
          );
        })}
      </Box>
    </Box>
  );
};

export default AboutSection;
