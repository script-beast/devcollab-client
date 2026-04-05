import React from "react";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { FiPlus, FiTrash2, FiX } from "react-icons/fi";
import type { ApiMemberCandidate } from "../../types/api";
import {
  getInitials,
  getProjectMemberRoleLabel,
} from "../../helper";
import {
  projectMemberRoleOptions,
  type ProjectMember,
  type ProjectMemberRole,
} from "../../types/models";

interface TeamDrawerProps {
  open: boolean;
  projectName: string;
  members: ProjectMember[];
  availableUsers: ApiMemberCandidate[];
  canManageTeam: boolean;
  onClose: () => void;
  onAddMember: (userId: string, role: ProjectMemberRole) => void;
  onRemoveMember: (memberId: string) => void;
  onChangeRole: (memberId: string, role: ProjectMemberRole) => void;
}

const TeamDrawer = ({
  open,
  projectName,
  members,
  availableUsers,
  canManageTeam,
  onClose,
  onAddMember,
  onRemoveMember,
  onChangeRole,
}: TeamDrawerProps) => {
  const [selectedUser, setSelectedUser] =
    React.useState<ApiMemberCandidate | null>(null);
  const [newMemberRole, setNewMemberRole] =
    React.useState<ProjectMemberRole>(1);
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setSelectedUser(null);
      setNewMemberRole(1);
      setSubmitted(false);
    }
  }, [open]);

  const addMember = () => {
    setSubmitted(true);

    if (!selectedUser) {
      return;
    }

    onAddMember(selectedUser.id, newMemberRole);
    setSelectedUser(null);
    setNewMemberRole(1);
    setSubmitted(false);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: "100vw", sm: 460, lg: 500 },
          p: { xs: 2, sm: 3 },
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={(theme) => ({
            position: "sticky",
            top: -1,
            zIndex: 2,
            pb: 1.2,
            mb: 1.8,
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
            backdropFilter: "blur(8px)",
            borderBottom: `1px solid ${theme.palette.border.subtle}`,
          })}
        >
          <Stack spacing={0.2}>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              Team Management
            </Typography>
            <Typography variant="body2">{projectName}</Typography>
          </Stack>

          <Button
            variant="outlined"
            size="small"
            onClick={onClose}
            startIcon={<FiX size={14} />}
          >
            Close
          </Button>
        </Stack>

        <Stack spacing={1.2}>
          <Typography variant="h3" sx={{ fontSize: "1rem" }}>
            Members ({members.length})
          </Typography>

          {members.length === 0 && (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              No members in this project yet.
            </Typography>
          )}

          <Stack spacing={1}>
            {members.map((member) => (
              <Stack
                key={member.id}
                direction="row"
                spacing={1}
                alignItems="center"
                sx={(theme) => ({
                  p: 1,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.border.subtle}`,
                  backgroundColor: alpha(theme.palette.common.white, 0.03),
                })}
              >
                <Avatar
                  sx={(theme) => ({
                    width: 32,
                    height: 32,
                    fontSize: "0.76rem",
                    color: theme.palette.primary.light,
                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
                  })}
                >
                  {getInitials(member.name)}
                </Avatar>

                <Stack sx={{ minWidth: 0, flexGrow: 1 }}>
                  <Typography variant="body2" noWrap>
                    {member.name}
                  </Typography>
                </Stack>

                <TextField
                  select
                  size="small"
                  value={member.role}
                  disabled={!canManageTeam}
                  onChange={(event) =>
                    onChangeRole(
                      member.id,
                      Number(event.target.value) as ProjectMemberRole,
                    )
                  }
                  sx={{ minWidth: 112 }}
                >
                  {projectMemberRoleOptions.map((role, index) => (
                    <MenuItem key={role} value={index}>
                      {getProjectMemberRoleLabel(index as ProjectMemberRole)}
                    </MenuItem>
                  ))}
                </TextField>

                <IconButton
                  color="error"
                  aria-label={`Remove ${member.name}`}
                  disabled={!canManageTeam}
                  onClick={() => onRemoveMember(member.id)}
                >
                  <FiTrash2 size={15} />
                </IconButton>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Divider sx={{ my: 2.2 }} />

        {canManageTeam ? (
          <Stack spacing={1.2}>
            <Typography variant="h3" sx={{ fontSize: "1rem" }}>
              Add Member
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.1}>
              <Autocomplete<ApiMemberCandidate, false, false, false>
                options={availableUsers}
                value={selectedUser}
                onChange={(_event, value) => setSelectedUser(value)}
                getOptionLabel={(option) => `${option.name} (${option.email})`}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Member"
                    error={submitted && !selectedUser}
                    helperText={
                      submitted && !selectedUser
                        ? "Please select a user"
                        : "Only users not already on this project are listed."
                    }
                    fullWidth
                  />
                )}
                fullWidth
              />

              <TextField
                select
                label="Role"
                value={newMemberRole}
                onChange={(event) =>
                  setNewMemberRole(Number(event.target.value) as ProjectMemberRole)
                }
                sx={{ minWidth: { sm: 130 } }}
              >
                {projectMemberRoleOptions.map((role, index) => (
                  <MenuItem key={role} value={index}>
                    {getProjectMemberRoleLabel(index as ProjectMemberRole)}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <Stack direction="row" justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={addMember}
                startIcon={<FiPlus size={14} />}
                disabled={availableUsers.length === 0}
              >
                Add Member
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Only project admins can manage team members. You can view members here.
          </Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default TeamDrawer;
