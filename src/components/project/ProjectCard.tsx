import React from "react";
import {
  Button,
  Chip,
  LinearProgress,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { FiExternalLink, FiMoreVertical, FiRefreshCcw } from "react-icons/fi";
import GlassCard from "../common/GlassCard";
import {
  formatDateLabel,
  getProjectStatusLabel,
  getProjectStatusTone,
} from "../../helper";
import { projectStatusOptions, type Project, type ProjectStatus } from "../../types/models";

interface ProjectCardProps {
  project: Project;
  canChangeStatus: boolean;
  onOpen: (project: Project) => void;
  onStatusChange: (projectId: string, status: ProjectStatus) => void;
}

const ProjectCard = ({
  project,
  canChangeStatus,
  onOpen,
  onStatusChange,
}: ProjectCardProps) => {
  const [actionsAnchor, setActionsAnchor] = React.useState<null | HTMLElement>(
    null,
  );
  const isActionsOpen = Boolean(actionsAnchor);

  const openActions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionsAnchor(event.currentTarget);
  };

  const closeActions = () => {
    setActionsAnchor(null);
  };

  const handleStatusChange = (status: ProjectStatus) => {
    onStatusChange(project.id, status);
    closeActions();
  };

  return (
    <GlassCard
      hoverable
      sx={{ p: 2.5, minHeight: 260, display: "grid", gap: 2 }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={1.2}
      >
        <Typography variant="h3" sx={{ fontSize: "1.05rem" }}>
          {project.name}
        </Typography>
        <Stack direction="row" spacing={0.8} alignItems="center">
          <Chip
            size="small"
            label={getProjectStatusLabel(project.status)}
            sx={(theme) => {
              const color = getProjectStatusTone(theme, project.status);

              return {
                color,
                borderColor: alpha(color, 0.44),
                backgroundColor: alpha(color, 0.15),
              };
            }}
          />
          <Button
            variant="text"
            size="small"
            onClick={openActions}
            disabled={!canChangeStatus}
            sx={{ minWidth: 32, px: 0.5 }}
          >
            <FiMoreVertical size={16} />
          </Button>
        </Stack>
      </Stack>

      <Typography variant="body2">{project.description}</Typography>

      <Stack spacing={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Progress
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {project.progress}%
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={project.progress}
          sx={(theme) => ({
            height: 7,
            borderRadius: 999,
            backgroundColor: alpha(theme.palette.common.white, 0.08),
            "& .MuiLinearProgress-bar": {
              borderRadius: 999,
              backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
            },
          })}
        />
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {project.issueCount} issues
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Updated {formatDateLabel(project.updatedAt)}
        </Typography>
      </Stack>

      <Button
        variant="outlined"
        onClick={() => onOpen(project)}
        startIcon={<FiExternalLink size={15} />}
      >
        Open Project
      </Button>

      <Menu
        anchorEl={actionsAnchor}
        open={isActionsOpen}
        onClose={closeActions}
      >
        <MenuItem
          onClick={() => {
            onOpen(project);
            closeActions();
          }}
        >
          <FiExternalLink size={14} style={{ marginRight: 8 }} />
          Open Project
        </MenuItem>
        {projectStatusOptions.map((status, idx) => (
          <MenuItem
            key={idx}
            // selected={idx === project.status}
            onClick={() => handleStatusChange(idx as ProjectStatus)}
            disabled={idx === project.status}
          >
            <FiRefreshCcw size={14} style={{ marginRight: 8 }} />
            Set status: {status}
          </MenuItem>
        ))}
      </Menu>
    </GlassCard>
  );
};

export default ProjectCard;
