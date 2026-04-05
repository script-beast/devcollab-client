import { Box, Button, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Link as RouterLink } from "react-router";
import { FiArrowRight, FiLogIn, FiUserPlus } from "react-icons/fi";
import GlassCard from "../common/GlassCard";

const CTASection = () => {
  return (
    <Box component="section" id="get-started">
      <GlassCard
        sx={(theme) => ({
          p: { xs: 1.8, md: 2.4 },
          overflow: "hidden",
          position: "relative",
          backgroundImage: `linear-gradient(130deg, ${alpha(theme.palette.primary.main, 0.22)} 0%, ${alpha(theme.palette.secondary.main, 0.16)} 55%, ${alpha(theme.palette.info.main, 0.16)} 100%)`,
        })}
      >
        <Stack spacing={1.15} sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="overline" sx={{ color: "text.secondary" }}>
            Start Building
          </Typography>

          <Typography
            variant="h2"
            sx={{ maxWidth: 780, fontSize: { xs: "1.4rem", md: "1.9rem" } }}
          >
            Build faster. Collaborate smarter. Ship with confidence.
          </Typography>

          <Typography variant="body2" sx={{ maxWidth: 620, color: "text.secondary" }}>
            One workspace for projects, issues, roles, and insights.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{ pt: 0.6 }}
          >
            <Button
              variant="contained"
              component={RouterLink}
              to="/register"
              startIcon={<FiUserPlus size={14} />}
            >
              Register
            </Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/login"
              startIcon={<FiLogIn size={14} />}
            >
              Login
            </Button>
            <Button
              variant="text"
              component={RouterLink}
              to="/projects"
              endIcon={<FiArrowRight size={14} />}
            >
              Explore App
            </Button>
          </Stack>
        </Stack>
      </GlassCard>
    </Box>
  );
};

export default CTASection;
