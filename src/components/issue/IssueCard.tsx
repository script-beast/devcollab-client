import React from "react";
import { Button, Chip, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  FiExternalLink,
  FiFlag,
  FiMoreVertical,
  FiRefreshCcw,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import GlassCard from "../common/GlassCard";
import TagChip from "../common/TagChip";
import {
  formatDateLabel,
  getIssuePriorityLabel,
  getIssuePriorityTone,
  getIssueStatusLabel,
  getIssueStatusTone,
} from "../../helper";
import {
  issueStatusOptions,
  type Issue,
  type IssueStatus,
} from "../../types/models";

const getNextStatus = (status: IssueStatus): IssueStatus | null => {
  if (status === 0) {
    return 1;
  }

  if (status === 1) {
    return 2;
  }

  return null;
};

interface IssueCardProps {
  issue: Issue;
  canChangeStatus: boolean;
  onSelect: (issue: Issue) => void;
  onStatusChange: (issueId: string, status: IssueStatus) => void;
  onDelete: (issueId: string) => void;
}

const IssueCard = ({
  issue,
  canChangeStatus,
  onSelect,
  onStatusChange,
  onDelete,
}: IssueCardProps) => {
  const [actionsAnchor, setActionsAnchor] = React.useState<null | HTMLElement>(
    null,
  );
  const isActionsOpen = Boolean(actionsAnchor);
  const nextStatus = getNextStatus(issue.status);

  const openIssue = () => onSelect(issue);

  const openActions = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setActionsAnchor(event.currentTarget);
  };

  const closeActions = () => {
    setActionsAnchor(null);
  };

  const handleStatusChange = (status: IssueStatus) => {
    onStatusChange(issue.id, status);
    closeActions();
  };

  const handleDelete = () => {
    onDelete(issue.id);
    closeActions();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openIssue();
    }
  };

  return (
    <GlassCard
      hoverable
      role="button"
      tabIndex={0}
      onClick={openIssue}
      onKeyDown={handleKeyDown}
      sx={{ p: 2, display: "grid", gap: 1.4, cursor: "pointer" }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Typography variant="h3" sx={{ fontSize: "1rem" }}>
          {issue.title}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={0.8}>
          <Chip
            size="small"
            label={getIssueStatusLabel(issue.status)}
            sx={(theme) => {
              const color = getIssueStatusTone(theme, issue.status);

              return {
                color,
                borderColor: alpha(color, 0.42),
                backgroundColor: alpha(color, 0.16),
              };
            }}
          />
          <Button
            variant="text"
            size="small"
            onClick={openActions}
            sx={{ minWidth: 32, px: 0.5 }}
          >
            <FiMoreVertical size={16} />
          </Button>
        </Stack>
      </Stack>

      <Typography variant="body2">{issue.description}</Typography>

      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
        {issue.labels.map((label) => (
          <TagChip key={label.name} label={label} />
        ))}
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        alignItems={{ xs: "flex-start", sm: "center" }}
        useFlexGap
        flexWrap="wrap"
        sx={(theme) => ({
          pt: 1,
          borderTop: `1px dashed ${alpha(theme.palette.common.white, 0.14)}`,
        })}
      >
        <Stack
          direction="row"
          spacing={0.65}
          alignItems="center"
          sx={(theme) => ({
            px: 1,
            py: 0.5,
            borderRadius: 999,
            color: theme.palette.primary.light,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
            backgroundColor: alpha(theme.palette.primary.main, 0.14),
          })}
        >
          <FiUser size={12} />
          <Typography variant="caption" sx={{ color: "inherit" }}>
            {issue.assignee}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={0.65}
          alignItems="center"
          sx={(theme) => {
            const color = getIssuePriorityTone(theme, issue.priority);

            return {
              px: 1,
              py: 0.5,
              borderRadius: 999,
              color,
              border: `1px solid ${alpha(color, 0.42)}`,
              backgroundColor: alpha(color, 0.14),
            };
          }}
        >
          <FiFlag size={12} />
          <Typography
            variant="caption"
            sx={{ color: "inherit", fontWeight: 600 }}
          >
            {getIssuePriorityLabel(issue.priority)} Priority
          </Typography>
        </Stack>

        <Typography
          variant="caption"
          sx={{ color: "text.secondary", ml: { sm: "auto" } }}
        >
          Updated {formatDateLabel(issue.updatedAt)}
        </Typography>
      </Stack>

      <Menu
        anchorEl={actionsAnchor}
        open={isActionsOpen}
        onClose={closeActions}
        onClick={(event) => event.stopPropagation()}
      >
        <MenuItem
          onClick={() => {
            openIssue();
            closeActions();
          }}
        >
          <FiExternalLink size={14} style={{ marginRight: 8 }} />
          Open Issue
        </MenuItem>
        {nextStatus !== null ? (
          <MenuItem
            onClick={() => handleStatusChange(nextStatus)}
            disabled={!canChangeStatus}
          >
            <FiRefreshCcw size={14} style={{ marginRight: 8 }} />
            Move to: {issueStatusOptions[nextStatus]}
          </MenuItem>
        ) : (
          <MenuItem disabled>
            <FiRefreshCcw size={14} style={{ marginRight: 8 }} />
            Status is already Closed
          </MenuItem>
        )}
        {!canChangeStatus && nextStatus !== null && (
          <MenuItem disabled>
            <FiRefreshCcw size={14} style={{ marginRight: 8 }} />
            Viewer role cannot change status
          </MenuItem>
        )}
        <MenuItem sx={{ color: "error.main" }} onClick={handleDelete}>
          <FiTrash2 size={14} style={{ marginRight: 8 }} />
          Delete Issue
        </MenuItem>
      </Menu>
    </GlassCard>
  );
};

export default IssueCard;
