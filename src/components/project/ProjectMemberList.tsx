import {
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { FiUsers } from "react-icons/fi";
import GlassCard from "../common/GlassCard";
import type { ProjectMember } from "../../types/models";

interface ProjectMemberListProps {
  members: ProjectMember[];
  canManageTeam: boolean;
  onManage: () => void;
}

const ProjectMemberList = ({
  members,
  canManageTeam,
  onManage,
}: ProjectMemberListProps) => {
  return (
    <GlassCard sx={{ p: 2, display: "grid", gap: 1.2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h3" sx={{ fontSize: "1rem" }}>
          Team Members
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {members.length} members
          </Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<FiUsers size={13} />}
            onClick={onManage}
          >
            {canManageTeam ? "Manage" : "View"}
          </Button>
        </Stack>
      </Stack>

      {members.length === 0 && (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          No members assigned to this project yet.
        </Typography>
      )}
    </GlassCard>
  );
};

export default ProjectMemberList;
