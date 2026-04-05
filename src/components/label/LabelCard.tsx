import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import GlassCard from "../common/GlassCard";
import type { Label } from "../../types/models";

interface LabelCardProps {
  label: Label;
  usageCount: number;
  onEdit: (label: Label) => void;
  onDelete: (label: Label) => void;
}

const LabelCard = ({ label, usageCount, onEdit, onDelete }: LabelCardProps) => {
  return (
    <GlassCard sx={{ p: 1.6, display: "grid", gap: 1.1 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 0 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: label.color,
              border: "1px solid",
              borderColor: "border.subtle",
              flexShrink: 0,
            }}
          />
          <Typography variant="subtitle2" sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
            {label.name}
          </Typography>
        </Stack>

        <Chip
          size="small"
          label={usageCount > 0 ? `Used in ${usageCount}` : "Unused"}
          sx={(theme) => ({
            color: usageCount > 0 ? theme.palette.text.secondary : theme.palette.warning.light,
            border: "1px solid",
            borderColor:
              usageCount > 0
                ? theme.palette.border.subtle
                : alpha(theme.palette.warning.main, 0.45),
            backgroundColor:
              usageCount > 0
                ? alpha(theme.palette.common.white, 0.02)
                : alpha(theme.palette.warning.main, 0.16),
          })}
        />
      </Stack>

      <Typography variant="body2" sx={{ color: "text.secondary", minHeight: 40 }}>
        {label.description}
      </Typography>

      <Stack direction="row" spacing={1}>
        <Button variant="outlined" size="small" startIcon={<FiEdit2 size={14} />} onClick={() => onEdit(label)}>
          Edit
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="error"
          startIcon={<FiTrash2 size={14} />}
          onClick={() => onDelete(label)}
        >
          Delete
        </Button>
      </Stack>
    </GlassCard>
  );
};

export default LabelCard;
