import { Box, Chip, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { FiCode, FiDatabase, FiLayers, FiShield } from "react-icons/fi";
import GlassCard from "../common/GlassCard";
import PageHeader from "../common/PageHeader";

const frontendStack = [
  "React 19",
  "TypeScript",
  "Vite",
  "Material UI",
  "Apollo Client",
  "React Router",
  "Recharts",
  "React Icons",
];

const backendStack = [
  "Node.js",
  "Express 5",
  "Apollo Server",
  "GraphQL",
  "Mongoose",
  "MongoDB",
  "Zod Validation",
];

const infraAndSecurity = [
  "JWT authentication",
  "Bcrypt password hashing",
  "Role-based authorization",
  "Soft-delete data strategy",
];

const spotlightTags = ["Type-safe", "GraphQL-first", "Role-aware"];

const TechStackSection = () => {
  return (
    <Box
      component="section"
      id="tech-stack"
      sx={(theme) => ({
        position: "relative",
        display: "grid",
        gap: 1.6,
        p: { xs: 1.1, md: 1.45 },
        borderRadius: { xs: "20px", md: "24px" },
        overflow: "hidden",
        border: `1px solid ${alpha(theme.palette.glass.borderStrong, 0.82)}`,
        backgroundImage: `linear-gradient(140deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 48%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
        "& > *": {
          position: "relative",
          zIndex: 1,
        },
        "& .tech-orb": {
          position: "absolute",
          borderRadius: "50%",
          filter: "blur(50px)",
          opacity: 0.56,
          pointerEvents: "none",
          zIndex: 0,
        },
        "& .tech-orb-a": {
          width: 220,
          height: 220,
          top: -110,
          right: -60,
          backgroundColor: alpha(theme.palette.primary.main, 0.36),
        },
        "& .tech-orb-b": {
          width: 200,
          height: 200,
          left: -80,
          bottom: -120,
          backgroundColor: alpha(theme.palette.info.main, 0.34),
        },
      })}
    >
      <Box className="tech-orb tech-orb-a" />
      <Box className="tech-orb tech-orb-b" />

      <PageHeader
        eyebrow="Tech Stack"
        title="Modern stack. Production-ready foundation."
        description="React + GraphQL on the front. Express + MongoDB on the back."
      />

      <Stack direction="row" spacing={0.7} useFlexGap flexWrap="wrap">
        {spotlightTags.map((tag) => (
          <Chip
            key={tag}
            size="small"
            label={tag}
            sx={(theme) => ({
              color: theme.palette.primary.light,
              borderColor: alpha(theme.palette.primary.main, 0.4),
              backgroundColor: alpha(theme.palette.primary.main, 0.14),
            })}
          />
        ))}
      </Stack>

      <Box
        sx={{
          display: "grid",
          gap: 1.2,
          gridTemplateColumns: {
            xs: "1fr",
            lg: "repeat(3, minmax(0, 1fr))",
          },
        }}
      >
        <GlassCard
          hoverable
          sx={(theme) => ({
            p: 1.6,
            display: "grid",
            gap: 0.95,
            minHeight: 220,
            borderColor: alpha(theme.palette.primary.main, 0.38),
            backgroundColor: alpha(theme.palette.common.white, 0.03),
          })}
        >
          <Stack direction="row" spacing={0.75} alignItems="center">
            <Box sx={{ color: "primary.light" }}>
              <FiLayers size={15} />
            </Box>
            <Typography variant="h3" sx={{ fontSize: "1rem" }}>
              Frontend
            </Typography>
          </Stack>

          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            UI layer and interaction engine.
          </Typography>

          <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
            {frontendStack.map((item) => (
              <Chip
                key={item}
                size="small"
                label={item}
                variant="outlined"
                sx={(theme) => ({
                  borderColor: alpha(theme.palette.border.strong, 0.72),
                  backgroundColor: alpha(theme.palette.common.white, 0.02),
                })}
              />
            ))}
          </Stack>
        </GlassCard>

        <GlassCard
          hoverable
          sx={(theme) => ({
            p: 1.6,
            display: "grid",
            gap: 0.95,
            minHeight: 220,
            borderColor: alpha(theme.palette.info.main, 0.36),
            backgroundColor: alpha(theme.palette.common.white, 0.03),
          })}
        >
          <Stack direction="row" spacing={0.75} alignItems="center">
            <Box sx={{ color: "info.light" }}>
              <FiDatabase size={15} />
            </Box>
            <Typography variant="h3" sx={{ fontSize: "1rem" }}>
              Backend
            </Typography>
          </Stack>

          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            API layer and data orchestration.
          </Typography>

          <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
            {backendStack.map((item) => (
              <Chip
                key={item}
                size="small"
                label={item}
                sx={(theme) => ({
                  borderColor: alpha(theme.palette.info.main, 0.34),
                  backgroundColor: alpha(theme.palette.info.main, 0.1),
                  color: theme.palette.info.light,
                })}
              />
            ))}
          </Stack>
        </GlassCard>

        <GlassCard
          hoverable
          sx={(theme) => ({
            p: 1.6,
            display: "grid",
            gap: 0.95,
            minHeight: 220,
            borderColor: alpha(theme.palette.secondary.main, 0.36),
            backgroundColor: alpha(theme.palette.common.white, 0.03),
          })}
        >
          <Stack direction="row" spacing={0.75} alignItems="center">
            <Box sx={{ color: "secondary.main" }}>
              <FiShield size={15} />
            </Box>
            <Typography variant="h3" sx={{ fontSize: "1rem" }}>
              Security and Data Rules
            </Typography>
          </Stack>

          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Permission guardrails and data safety.
          </Typography>

          <Stack spacing={0.58}>
            {infraAndSecurity.map((item) => (
              <Stack key={item} direction="row" spacing={0.62} alignItems="center">
                <Box
                  sx={(theme) => ({
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    backgroundColor: alpha(theme.palette.secondary.main, 0.9),
                  })}
                />
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {item}
                </Typography>
              </Stack>
            ))}
          </Stack>

          <Stack direction="row" spacing={0.7} alignItems="center" sx={{ pt: 0.2 }}>
            <Box sx={{ color: "text.secondary" }}>
              <FiCode size={12} />
            </Box>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Schema and resolvers drive behavior end-to-end.
            </Typography>
          </Stack>
        </GlassCard>
      </Box>
    </Box>
  );
};

export default TechStackSection;
