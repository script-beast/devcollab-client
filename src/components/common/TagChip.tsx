import { Chip, Tooltip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { FiTag } from "react-icons/fi";
import type { IssueLabel } from "../../types/models";

interface TagChipProps {
  label: IssueLabel;
}

const TagChip = ({ label }: TagChipProps) => {
  return (
    <Tooltip title={label.description || "No description provided."} arrow>
      <Chip
        size="small"
        label={label.name}
        variant="outlined"
        icon={<FiTag size={12} />}
        sx={{
          color: label.color,
          borderColor: alpha(label.color, 0.5),
          backgroundColor: alpha(label.color, 0.14),
          "& .MuiChip-icon": {
            color: label.color,
          },
          px: 1.2,
        }}
      />
    </Tooltip>
  );
};

export default TagChip;
