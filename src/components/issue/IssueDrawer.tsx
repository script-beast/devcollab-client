import React from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { FiMessageSquare, FiX } from "react-icons/fi";
import {
  formatDateLabel,
  getIssuePriorityLabel,
  getIssueStatusLabel,
  getIssueStatusTone,
} from "../../helper";
import type { Issue } from "../../types/models";
import TagChip from "../common/TagChip";
import AddCommentModal from "./AddCommentModal";
import CommentTrail from "./CommentTrail";

interface IssueDrawerProps {
  open: boolean;
  issue: Issue | null;
  canAddComment: boolean;
  onClose: () => void;
  onAddComment: (issueId: string, message: string) => void;
}

const IssueDrawer = ({
  open,
  issue,
  canAddComment,
  onClose,
  onAddComment,
}: IssueDrawerProps) => {
  const [isAddCommentOpen, setIsAddCommentOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setIsAddCommentOpen(false);
    }
  }, [open, issue?.id]);

  const handleAddComment = (message: string) => {
    if (!issue) {
      return;
    }

    onAddComment(issue.id, message);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: "100vw", sm: 490, lg: 540 },
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
            pb: 1.2,
            mb: 1.8,
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
            backdropFilter: "blur(8px)",
            borderBottom: `1px solid ${theme.palette.border.subtle}`,
          })}
        >
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            Issue details
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={onClose}
            startIcon={<FiX size={14} />}
          >
            Close
          </Button>
        </Stack>

        {!issue && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Select an issue from the list to inspect details and discussion.
          </Typography>
        )}

        {issue && (
          <Stack spacing={2.5}>
            <Stack spacing={1.2}>
              <Typography variant="h3" sx={{ fontSize: "1.24rem" }}>
                {issue.title}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip
                  label={getIssueStatusLabel(issue.status)}
                  size="small"
                  sx={(theme) => {
                    const color = getIssueStatusTone(theme, issue.status);

                    return {
                      color,
                      borderColor: alpha(color, 0.42),
                      backgroundColor: alpha(color, 0.16),
                    };
                  }}
                />
                <Chip
                  size="small"
                  label={`Priority: ${getIssuePriorityLabel(issue.priority)}`}
                  variant="outlined"
                />
              </Stack>
            </Stack>

            <Typography variant="body1">{issue.description}</Typography>

            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {issue.labels.map((label) => (
                <TagChip key={label.name} label={label} />
              ))}
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              spacing={{ xs: 1, sm: 2 }}
            >
              <Typography variant="body2">
                Assignee: {issue.assignee}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Updated {formatDateLabel(issue.updatedAt, { withTime: true })}
              </Typography>
            </Stack>

            <Divider />

            <Stack spacing={1.2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Typography variant="h3" sx={{ fontSize: "1rem" }}>
                  Comment Trail
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  disabled={!canAddComment}
                  onClick={() => setIsAddCommentOpen(true)}
                  startIcon={<FiMessageSquare size={14} />}
                >
                  Add Comment
                </Button>
              </Stack>
              {!canAddComment && (
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {issue.status === 2
                    ? "Closed issues are read-only and cannot receive new comments."
                    : "Only the project admin or current assignee can add comments."}
                </Typography>
              )}
              <CommentTrail comments={issue.comments} />
            </Stack>
          </Stack>
        )}

        <AddCommentModal
          open={isAddCommentOpen}
          onClose={() => setIsAddCommentOpen(false)}
          onSubmit={handleAddComment}
        />
      </Box>
    </Drawer>
  );
};

export default IssueDrawer;
