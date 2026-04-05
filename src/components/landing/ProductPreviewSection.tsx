import { Box, Chip, LinearProgress, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { FiArrowRight, FiMessageSquare, FiUsers } from "react-icons/fi";
import GlassCard from "../common/GlassCard";
import PageHeader from "../common/PageHeader";

const previewProjects = [
  {
    name: "Apollo Gateway v2",
    status: "Active",
    progress: 72,
    issues: 14,
  },
  {
    name: "Client UX Refresh",
    status: "Active",
    progress: 58,
    issues: 21,
  },
  {
    name: "Security Hardening",
    status: "Archived",
    progress: 100,
    issues: 9,
  },
];

const issuePreview = {
  title: "Harden auth middleware and role checks",
  desc: "Strengthen JWT validation and ensure proper access control for protected routes.",
  status: "In Progress",
  priority: "High",
  assignee: "Backend Member",
  viewer: "Frontend Viewer",
  labels: ["security", "auth", "backend"],
  comments: [
    "Validated JWT context extraction.",
    "Confirmed role restrictions for status updates.",
  ],
};

const rolePreview = [
  {
    role: "Admin",
    rights: "Manage project state, members, and team roles",
  },
  {
    role: "Member",
    rights: "Create and update issues, participate in delivery flow",
  },
  {
    role: "Viewer",
    rights: "Read workspace data with restricted edit actions",
  },
];

const ProductPreviewSection = () => {
  return (
    <Box component="section" id="preview" sx={{ display: "grid", gap: 1.6 }}>
      <PageHeader
        eyebrow="Product Preview"
        title="See the workflow at a glance"
        description="Real UI patterns inspired by your current app modules."
      />

      <Box
        sx={{
          display: "grid",
          gap: 1.15,
          gridTemplateColumns: {
            xs: "1fr",
            xl: "1.08fr 1fr 1fr",
          },
          alignItems: "stretch",
        }}
      >
        <GlassCard sx={{ p: 1.6, display: "grid", gap: 1.1 }}>
          <Typography variant="overline" sx={{ color: "text.secondary" }}>
            Dashboard Snapshot
          </Typography>

          <Stack spacing={0.9}>
            {previewProjects.map((project) => (
              <Box
                key={project.name}
                sx={(theme) => ({
                  borderRadius: "14px",
                  p: 1,
                  border: `1px solid ${theme.palette.border.subtle}`,
                  backgroundColor: alpha(theme.palette.common.white, 0.03),
                })}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={1}
                >
                  <Typography variant="subtitle2" sx={{ fontSize: "0.84rem" }}>
                    {project.name}
                  </Typography>
                  <Chip
                    size="small"
                    label={project.status}
                    sx={(theme) => ({
                      color:
                        project.status === "Archived"
                          ? theme.palette.error.main
                          : theme.palette.success.main,
                      borderColor:
                        project.status === "Archived"
                          ? alpha(theme.palette.error.main, 0.35)
                          : alpha(theme.palette.success.main, 0.35),
                      backgroundColor:
                        project.status === "Archived"
                          ? alpha(theme.palette.error.main, 0.14)
                          : alpha(theme.palette.success.main, 0.14),
                    })}
                  />
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mt: 0.8 }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {project.issues} issues
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {project.progress}% complete
                  </Typography>
                </Stack>

                <LinearProgress
                  variant="determinate"
                  value={project.progress}
                  sx={(theme) => ({
                    mt: 0.65,
                    height: 6,
                    borderRadius: 999,
                    backgroundColor: alpha(theme.palette.common.white, 0.09),
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 999,
                      backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    },
                  })}
                />
              </Box>
            ))}
          </Stack>
        </GlassCard>

        <GlassCard sx={{ p: 1.6, display: "grid", gap: 1 }}>
          <Typography variant="overline" sx={{ color: "text.secondary" }}>
            Issue + Comments
          </Typography>

          <Typography variant="subtitle2">{issuePreview.title}</Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {issuePreview.desc}
          </Typography>

          <Stack direction="row" spacing={0.7} useFlexGap flexWrap="wrap">
            <Chip size="small" label={issuePreview.status} variant="outlined" />
            <Chip
              size="small"
              label={`${issuePreview.priority} priority`}
              variant="outlined"
            />
            <Chip
              size="small"
              label={issuePreview.assignee}
              variant="outlined"
            />
            <Chip size="small" label={issuePreview.viewer} variant="outlined" />
          </Stack>

          <Stack direction="row" spacing={0.6} useFlexGap flexWrap="wrap">
            {issuePreview.labels.map((label) => (
              <Chip
                key={label}
                size="small"
                label={label}
                sx={(theme) => ({
                  color: theme.palette.primary.light,
                  borderColor: alpha(theme.palette.primary.main, 0.44),
                  backgroundColor: alpha(theme.palette.primary.main, 0.14),
                })}
              />
            ))}
          </Stack>

          <Stack spacing={0.75}>
            {issuePreview.comments.map((comment) => (
              <Stack
                key={comment}
                direction="row"
                spacing={0.7}
                alignItems="flex-start"
              >
                <Box sx={{ color: "secondary.main", mt: 0.15 }}>
                  <FiMessageSquare size={13} />
                </Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {comment}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </GlassCard>

        <GlassCard sx={{ p: 1.6, display: "grid", gap: 1.05 }}>
          <Typography variant="overline" sx={{ color: "text.secondary" }}>
            Team Roles
          </Typography>

          <Stack spacing={0.75}>
            {rolePreview.map((roleItem) => (
              <Box
                key={roleItem.role}
                sx={(theme) => ({
                  p: 0.95,
                  borderRadius: "12px",
                  border: `1px solid ${theme.palette.border.subtle}`,
                  backgroundColor: alpha(theme.palette.common.white, 0.03),
                })}
              >
                <Stack direction="row" spacing={0.65} alignItems="center">
                  <Box sx={{ color: "primary.light" }}>
                    <FiUsers size={13} />
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontSize: "0.82rem" }}>
                    {roleItem.role}
                  </Typography>
                </Stack>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {roleItem.rights}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Stack
            direction="row"
            spacing={0.55}
            alignItems="center"
            sx={{ color: "text.secondary", pt: 0.15 }}
          >
            <FiArrowRight size={12} />
            <Typography variant="caption">
              Role changes can unassign issues to keep ownership clean.
            </Typography>
          </Stack>
        </GlassCard>
      </Box>
    </Box>
  );
};

export default ProductPreviewSection;
