import React from "react";
import { Box, Button, Drawer, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { FiBarChart2, FiFolder, FiLogOut, FiMap, FiTag, FiUser } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router";
import GlassCard from "../components/common/GlassCard";
import { useAuth } from "../contexts/AuthContext";
import apolloClient from "../api/apolloClient";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const sidebarWidth = 274;

const navigationItems = [
  { label: "Projects", to: "/projects", icon: FiFolder },
  { label: "Board", to: "/board", icon: FiMap },
  { label: "Labels", to: "/labels", icon: FiTag },
  { label: "Insights", to: "/insights", icon: FiBarChart2 },
];

const Sidebar = ({ mobileOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const userName = React.useMemo(() => {
    const fallback = "Developer";

    return user?.username?.trim() || fallback;
  }, [user]);

  const handleLogout = () => {
    void apolloClient.clearStore().catch(() => undefined);
    logout();
    onClose();
    navigate("/login", { replace: true });
  };

  const drawerContent = (
    <Stack sx={{ height: "100%", p: 2, gap: 2 }}>
      <GlassCard sx={{ p: 2 }}>
        <Typography variant="overline" sx={{ color: "text.secondary", letterSpacing: "0.12em" }}>
          DevCollab
        </Typography>
        <Typography variant="h3" sx={{ mt: 0.4, fontSize: "1.08rem" }}>
          Engineering Workspace
        </Typography>
      </GlassCard>

      <GlassCard sx={{ p: 1.1 }}>
        <Stack spacing={0.7}>
          {navigationItems.map(({ label, to, icon: Icon }) => (
            <NavLink key={label} to={to} onClick={onClose} style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Box
                  sx={(theme) => ({
                    borderRadius: theme.shape.borderRadius,
                    px: 1.4,
                    py: 1,
                    color: theme.palette.text.primary,
                    backgroundColor: isActive
                      ? alpha(theme.palette.primary.main, 0.22)
                      : alpha(theme.palette.common.white, 0.02),
                    border: `1px solid ${
                      isActive ? alpha(theme.palette.primary.main, 0.48) : theme.palette.border.subtle
                    }`,
                    transition: "all 180ms ease",
                    "&:hover": {
                      borderColor: theme.palette.glass.borderStrong,
                      transform: "translateX(1px)",
                    },
                  })}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Icon size={16} />
                    <Typography variant="subtitle2">{label}</Typography>
                  </Stack>
                </Box>
              )}
            </NavLink>
          ))}
        </Stack>
      </GlassCard>

      <GlassCard sx={{ mt: "auto", p: 1.25 }}>
        <Stack spacing={1.2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              sx={(theme) => ({
                width: 30,
                height: 30,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                color: theme.palette.primary.light,
                backgroundColor: alpha(theme.palette.primary.main, 0.24),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
              })}
            >
              <FiUser size={14} />
            </Box>
            <Stack spacing={0}>
              <Typography variant="subtitle2" sx={{ lineHeight: 1.2 }}>
                {userName}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Active Workspace
              </Typography>
            </Stack>
          </Stack>

          <Button variant="outlined" size="small" startIcon={<FiLogOut size={14} />} onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </GlassCard>
    </Stack>
  );

  return (
    <Box component="nav" sx={{ width: { md: sidebarWidth }, flexShrink: { md: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: sidebarWidth,
            boxSizing: "border-box",
            borderRight: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: sidebarWidth,
            boxSizing: "border-box",
            borderRight: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
