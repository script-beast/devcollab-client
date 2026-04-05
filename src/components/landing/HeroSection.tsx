import {
  Box,
  // Button,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
// import { Link as RouterLink } from "react-router";
import {
  //   FiArrowRight,
  FiCheckCircle,
  //   FiLogIn,
  //   FiUserPlus,
} from "react-icons/fi";
import GlassCard from "../common/GlassCard";

const quickSignals = [
  "Build faster",
  "Collaborate smarter",
  "Track every issue",
  "Insights that matter",
];

// const capabilityChips = [
//   "Projects",
//   "Board",
//   "Issues",
//   "Comments",
//   "Labels",
//   "Insights",
// ];

const heroStats = [
  {
    label: "Roles",
    value: "3",
    helper: "admin, member, viewer",
  },
  {
    label: "Issue Flow",
    value: "3",
    helper: "todo, in-progress, closed",
  },
  {
    label: "Workspace Views",
    value: "4",
    helper: "projects, board, labels, insights",
  },
  {
    label: "Auth",
    value: "JWT",
    helper: "login, register, protected routes",
  },
];

const boardPreview = [
  {
    stage: "Todo",
    count: 9,
    ticket: "Polish issue drawer interactions",
  },
  {
    stage: "In Progress",
    count: 5,
    ticket: "Strengthen role-based team actions",
  },
  {
    stage: "Closed",
    count: 14,
    ticket: "Ship dashboard and insights refinements",
  },
];

const HeroSection = () => {
  return (
    <Box
      component="section"
      id="home"
      sx={(theme) => ({
        position: "relative",
        display: "grid",
        gap: { xs: 2.4, md: 2.9 },
        overflow: "hidden",
        borderRadius: { xs: "22px", md: "26px" },
        p: { xs: 1.15, md: 1.8 },
        border: `1px solid ${alpha(theme.palette.glass.borderStrong, 0.78)}`,
        backgroundImage: `linear-gradient(145deg, ${alpha(theme.palette.common.white, 0.04)} 0%, transparent 62%)`,
        "& > *:not(.hero-orb)": {
          position: "relative",
          zIndex: 1,
        },
        "& .hero-orb": {
          position: "absolute",
          borderRadius: "50%",
          filter: "blur(56px)",
          pointerEvents: "none",
          opacity: 0.65,
          zIndex: 0,
        },
        "& .orb-one": {
          width: 260,
          height: 260,
          top: -120,
          left: -60,
          backgroundColor: alpha(theme.palette.primary.main, 0.38),
          animation: "heroFloat 10s ease-in-out infinite",
        },
        "& .orb-two": {
          width: 240,
          height: 240,
          right: -70,
          bottom: -120,
          backgroundColor: alpha(theme.palette.secondary.main, 0.34),
          animation: "heroFloatAlt 12s ease-in-out infinite",
        },
        "@keyframes heroFloat": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(12px, 10px, 0)" },
        },
        "@keyframes heroFloatAlt": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(-16px, -10px, 0)" },
        },
      })}
    >
      <Box className="hero-orb orb-one" />
      <Box className="hero-orb orb-two" />

      <Stack spacing={1.25}>
        <Chip
          size="small"
          label="DevCollab Engineering Workspace"
          sx={(theme) => ({
            alignSelf: "flex-start",
            letterSpacing: "0.06em",
            color: theme.palette.primary.light,
            borderColor: alpha(theme.palette.primary.main, 0.42),
            backgroundColor: alpha(theme.palette.primary.main, 0.18),
          })}
        />

        <Typography
          variant="h1"
          sx={(theme) => ({
            maxWidth: 980,
            fontSize: { xs: "2.35rem", md: "3.6rem" },
            lineHeight: 1,
            letterSpacing: "-0.03em",
            textShadow: `0 18px 42px ${alpha(theme.palette.primary.main, 0.2)}`,
            "& .hero-gradient": {
              backgroundImage: `linear-gradient(110deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            },
          })}
        >
          DevCollab
          <br />
          <span className="hero-gradient">
            Built for modern developer teams
          </span>
        </Typography>

        <Typography variant="subtitle1" sx={{ maxWidth: 760 }}>
          From first ticket to final ship, keep every workflow clear.
        </Typography>

        {/* <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.05}
          useFlexGap
          flexWrap="wrap"
          sx={{ pt: 0.95, alignItems: { sm: "center" } }}
        >
          <Button
            variant="contained"
            component={RouterLink}
            to="/register"
            startIcon={<FiUserPlus size={14} />}
            size="large"
            sx={(theme) => ({
              minWidth: { sm: 170 },
              backgroundImage: `linear-gradient(125deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
              boxShadow: `0 16px 34px ${alpha(theme.palette.primary.main, 0.42)}`,
            })}
          >
            Register
          </Button>
          <Button
            variant="outlined"
            component={RouterLink}
            to="/login"
            startIcon={<FiLogIn size={14} />}
            size="large"
          >
            Login
          </Button>
          <Button
            variant="text"
            component={RouterLink}
            to="/projects"
            endIcon={<FiArrowRight size={14} />}
            size="large"
          >
            Explore App
          </Button>
        </Stack>

        <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap" sx={{ pt: 0.55 }}>
          {capabilityChips.map((chip) => (
            <Chip key={chip} size="small" label={chip} variant="outlined" />
          ))}
        </Stack> */}
      </Stack>

      <Box
        sx={{
          display: "grid",
          gap: 1.25,
          gridTemplateColumns: {
            xs: "1fr",
            lg: "1.2fr 1fr",
          },
          alignItems: "center",
        }}
      >
        <GlassCard
          sx={(theme) => ({
            p: 1.75,
            display: "grid",
            gap: 1.05,
            borderColor: alpha(theme.palette.primary.main, 0.5),
            boxShadow: theme.shadows[10],
            backgroundImage: `linear-gradient(130deg, ${alpha(theme.palette.primary.main, 0.18)} 0%, ${alpha(theme.palette.info.main, 0.08)} 100%)`,
          })}
        >
          <Typography
            variant="overline"
            sx={{ color: "text.secondary", letterSpacing: "0.1em" }}
          >
            Live Workflow Preview
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Track movement from backlog to done in one glance.
          </Typography>

          <Stack direction={{ xs: "column", md: "row" }} spacing={0.9}>
            {boardPreview.map((column, index) => (
              <Box
                key={column.stage}
                sx={(theme) => ({
                  flex: 1,
                  p: 1.05,
                  borderRadius: "14px",
                  border: `1px solid ${alpha(theme.palette.common.white, 0.14)}`,
                  backgroundColor: alpha(theme.palette.common.white, 0.04),
                  transition: "transform 180ms ease, border-color 180ms ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    borderColor: alpha(theme.palette.primary.light, 0.5),
                  },
                })}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={1}
                >
                  <Typography variant="subtitle2" sx={{ fontSize: "0.82rem" }}>
                    {column.stage}
                  </Typography>
                  <Box
                    sx={(theme) => ({
                      minWidth: 20,
                      px: 0.6,
                      py: 0.2,
                      borderRadius: 999,
                      textAlign: "center",
                      fontSize: "0.68rem",
                      color: theme.palette.text.secondary,
                      border: `1px solid ${alpha(theme.palette.common.white, 0.22)}`,
                    })}
                  >
                    {column.count}
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  spacing={0.55}
                  alignItems="flex-start"
                  sx={{ mt: 0.75 }}
                >
                  <Box
                    sx={(theme) => ({
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      mt: "5px !important",
                      backgroundColor:
                        index === 0
                          ? theme.palette.warning.main
                          : index === 1
                            ? theme.palette.primary.main
                            : theme.palette.success.main,
                    })}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {column.ticket}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Stack>
        </GlassCard>

        <Stack spacing={1.1}>
          <GlassCard
            sx={(theme) => ({
              p: 1.5,
              display: "grid",
              gap: 0.85,
              borderColor: alpha(theme.palette.secondary.main, 0.34),
            })}
          >
            <Typography variant="overline" sx={{ color: "text.secondary" }}>
              Why teams choose DevCollab
            </Typography>

            <Stack spacing={0.6}>
              {quickSignals.map((signal) => (
                <Stack
                  key={signal}
                  direction="row"
                  spacing={0.6}
                  alignItems="center"
                >
                  <Box sx={{ color: "secondary.main", mt: 0.05 }}>
                    <FiCheckCircle size={13} />
                  </Box>
                  <Typography variant="body2">{signal}</Typography>
                </Stack>
              ))}
            </Stack>
          </GlassCard>
        </Stack>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: 0.95,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(4, minmax(0, 1fr))",
          },
        }}
      >
        {heroStats.map((item) => (
          <GlassCard
            key={item.label}
            sx={(theme) => ({
              p: 1.2,
              backgroundColor: alpha(theme.palette.common.white, 0.04),
              borderColor: alpha(theme.palette.border.strong, 0.55),
              transition: "transform 180ms ease, border-color 180ms ease",
              "&:hover": {
                transform: "translateY(-2px)",
                borderColor: alpha(theme.palette.primary.main, 0.48),
              },
            })}
          >
            <Typography variant="overline" sx={{ color: "text.secondary" }}>
              {item.label}
            </Typography>
            <Typography variant="h2" sx={{ mt: 0.1, fontSize: "1.22rem" }}>
              {item.value}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {item.helper}
            </Typography>
          </GlassCard>
        ))}
      </Box>
    </Box>
  );
};

export default HeroSection;
