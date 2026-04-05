import { Box, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { formatDateLabel } from "../../helper";
import type { IssueComment } from "../../types/models";
import GlassCard from "../common/GlassCard";

interface CommentTrailProps {
  comments: IssueComment[];
}

const CommentTrail = ({ comments }: CommentTrailProps) => {
  if (!comments.length) {
    return (
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        No comments yet. Start the discussion to align on implementation details.
      </Typography>
    );
  }

  return (
    <Stack spacing={1.8}>
      {comments.map((comment, index) => (
        <Box key={comment.id} sx={{ position: "relative", pl: 3.2 }}>
          {index !== comments.length - 1 && (
            <Box
              sx={(theme) => ({
                position: "absolute",
                left: 7,
                top: 18,
                bottom: -20,
                width: 2,
                borderRadius: 99,
                backgroundColor: alpha(theme.palette.common.white, 0.16),
              })}
            />
          )}

          <Box
            sx={(theme) => ({
              position: "absolute",
              left: 0,
              top: 8,
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: theme.palette.primary.main,
              boxShadow: `0 0 0 5px ${alpha(theme.palette.primary.main, 0.2)}`,
            })}
          />

          <GlassCard
            sx={(theme) => ({
              p: 1.6,
              backgroundColor: theme.palette.glass.backgroundStrong,
            })}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle2">{comment.userName}</Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {formatDateLabel(comment.timestamp, { withTime: true, withYear: false })}
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ mt: 0.8 }}>
              {comment.message}
            </Typography>
          </GlassCard>
        </Box>
      ))}
    </Stack>
  );
};

export default CommentTrail;
