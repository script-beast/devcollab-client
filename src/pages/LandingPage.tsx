import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Link as RouterLink } from "react-router";
import { FiArrowRight, FiLogIn, FiUserPlus } from "react-icons/fi";
import HeroSection from "../components/landing/HeroSection";
import AboutSection from "../components/landing/AboutSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import ProductPreviewSection from "../components/landing/ProductPreviewSection";
import TechStackSection from "../components/landing/TechStackSection";
import DeveloperSection from "../components/landing/DeveloperSection";
// import CTASection from "../components/landing/CTASection";
import GlassCard from "../components/common/GlassCard";

// const sectionLinks = [
//   { label: "About", href: "#about" },
//   { label: "Features", href: "#features" },
//   { label: "Preview", href: "#preview" },
//   { label: "Tech", href: "#tech-stack" },
//   { label: "Developer", href: "#developer" },
// ];

const LandingPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        overflowX: "clip",
        pb: { xs: 5, md: 9 },
      }}
    >
      <Box
        sx={(theme) => ({
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
            radial-gradient(circle at 8% -10%, ${alpha(theme.palette.primary.main, 0.24)} 0%, transparent 46%),
            radial-gradient(circle at 92% -12%, ${alpha(theme.palette.secondary.main, 0.2)} 0%, transparent 41%),
            radial-gradient(circle at 60% 112%, ${alpha(theme.palette.info.main, 0.22)} 0%, transparent 44%)
          `,
        })}
      />

      <Container maxWidth="lg" sx={{ pt: { xs: 1.6, md: 2.2 }, position: "relative", zIndex: 2 }}>
        <GlassCard
          component="header"
          sx={(theme) => ({
            px: { xs: 1.1, sm: 1.6 },
            py: 0.9,
            position: "sticky",
            top: { xs: 8, md: 14 },
            zIndex: 40,
            borderColor: theme.palette.glass.borderStrong,
            backgroundColor: alpha(theme.palette.glass.backgroundStrong, 0.92),
            backdropFilter: "blur(20px)",
          })}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Stack spacing={0}>
              <Typography variant="overline" sx={{ letterSpacing: "0.11em" }}>
                DevCollab
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                Full-Stack Team Workspace
              </Typography>
            </Stack>

            {/* <Stack
              direction="row"
              spacing={0.4}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {sectionLinks.map((link) => (
                <Button
                  key={link.label}
                  size="small"
                  component="a"
                  href={link.href}
                  sx={{ color: "text.secondary" }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack> */}

            <Stack direction="row" spacing={0.7}>
              <Button
                variant="outlined"
                size="small"
                component={RouterLink}
                to="/login"
                startIcon={<FiLogIn size={13} />}
              >
                Login
              </Button>
              <Button
                variant="contained"
                size="small"
                component={RouterLink}
                to="/register"
                startIcon={<FiUserPlus size={13} />}
                endIcon={<FiArrowRight size={13} />}
              >
                Register
              </Button>
            </Stack>
          </Stack>
        </GlassCard>
      </Container>

      <Container
        maxWidth="lg"
        sx={(theme) => ({
          position: "relative",
          zIndex: 1,
          pt: { xs: 2.8, md: 4.2 },
          display: "grid",
          gap: { xs: 3.1, md: 4.2 },
          "& > section": {
            scrollMarginTop: theme.spacing(14),
          },
          "& > section + section": {
            pt: { xs: 2.5, md: 3.2 },
            borderTop: `1px solid ${alpha(theme.palette.border.subtle, 0.8)}`,
          },
        })}
      >
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <ProductPreviewSection />
        <TechStackSection />
        <DeveloperSection />
        {/* <CTASection /> */}

        <Typography
          variant="caption"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            pb: 1,
          }}
        >
          DevCollab · Modern workspace for projects, issues, and team delivery.
        </Typography>
      </Container>
    </Box>
  );
};

export default LandingPage;
