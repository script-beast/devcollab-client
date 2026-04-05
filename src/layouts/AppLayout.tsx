import React from "react";
import { Box, Container } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        overflowX: "clip",
      }}
    >
      <Box
        sx={(theme) => ({
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
            radial-gradient(circle at 14% 12%, ${alpha(theme.palette.primary.main, 0.18)} 0%, transparent 40%),
            radial-gradient(circle at 82% -8%, ${alpha(theme.palette.info.main, 0.16)} 0%, transparent 38%)
          `,
        })}
      />

      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          maxWidth: "100%",
          overflowX: "clip",
          px: { xs: 2, md: 3 },
          py: { xs: 2, md: 3 },
          display: "grid",
          gap: 2.3,
        }}
      >
        <Topbar onOpenSidebar={() => setMobileSidebarOpen(true)} />
        <Container maxWidth="xl" sx={{ px: 0, width: "100%", maxWidth: "100%", minWidth: 0 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default AppLayout;
