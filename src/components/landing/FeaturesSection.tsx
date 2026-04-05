import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  FiActivity,
  FiBarChart2,
  FiCheckSquare,
  FiLayers,
  FiLock,
  FiMessageCircle,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import GlassCard from "../common/GlassCard";
import PageHeader from "../common/PageHeader";

interface FeatureItem {
  title: string;
  description: string;
  icon: IconType;
}

const features: FeatureItem[] = [
  {
    title: "Project Dashboard",
    description: "Manage projects, state, progress, and team visibility in one place.",
    icon: FiLayers,
  },
  {
    title: "Board View",
    description: "Scan todo, in-progress, and closed work across the workspace.",
    icon: FiActivity,
  },
  {
    title: "Issue Tracking",
    description: "Track priority, assignee, labels, and forward status flow.",
    icon: FiCheckSquare,
  },
  {
    title: "Comment Trail",
    description: "Keep issue conversations clear with contextual comment history.",
    icon: FiMessageCircle,
  },
  {
    title: "Labels",
    description: "Classify work quickly with color-coded workspace labels.",
    icon: FiTag,
  },
  {
    title: "Insights",
    description: "Measure issue distribution, progress, and activity trends.",
    icon: FiBarChart2,
  },
  {
    title: "Authentication",
    description: "Secure access with JWT auth and protected route gating.",
    icon: FiLock,
  },
  {
    title: "Collaboration Roles",
    description: "Control permissions with admin, member, and viewer roles.",
    icon: FiUsers,
  },
];

const FeaturesSection = () => {
  return (
    <Box component="section" id="features" sx={{ display: "grid", gap: 1.6 }}>
      <PageHeader
        eyebrow="Core Features"
        title="Built for daily delivery"
        description="Short, sharp, and powered by real product modules."
      />

      <Box
        sx={{
          display: "grid",
          gap: 1.15,
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(4, minmax(0, 1fr))",
          },
        }}
      >
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <GlassCard
              key={feature.title}
              hoverable
              sx={(theme) => ({
                p: 1.5,
                display: "grid",
                gap: 0.9,
                minHeight: 158,
                backgroundColor: alpha(theme.palette.common.white, 0.03),
              })}
            >
              <Box
                sx={(theme) => ({
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  color: theme.palette.primary.light,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.46)}`,
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                })}
              >
                <Icon size={15} />
              </Box>

              <Typography variant="h3" sx={{ fontSize: "0.98rem" }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {feature.description}
              </Typography>
            </GlassCard>
          );
        })}
      </Box>
    </Box>
  );
};

export default FeaturesSection;
