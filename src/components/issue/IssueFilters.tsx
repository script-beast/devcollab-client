import { Button, Stack, Typography } from "@mui/material";
import {
  issueStatusOptions,
  priorityOptions,
  type IssuePriority,
  type IssueStatus,
} from "../../types/models";

export type StatusFilterValue = -1 | IssueStatus;
export type PriorityFilterValue = -1 | IssuePriority;

interface IssueFiltersProps {
  activeStatus: StatusFilterValue;
  activePriority: PriorityFilterValue;
  onStatusChange: (nextFilter: StatusFilterValue) => void;
  onPriorityChange: (nextFilter: PriorityFilterValue) => void;
}

const statusFilterOptions: { id: StatusFilterValue; title: string }[] = [
  { id: -1, title: "All" },
  ...issueStatusOptions.map((status, index) => ({
    id: index as IssueStatus,
    title: status,
  })),
];

const priorityFilterOptions: { id: PriorityFilterValue; title: string }[] = [
  { id: -1, title: "All" },
  ...priorityOptions.map((priority, index) => ({
    id: index as IssuePriority,
    title: priority,
  })),
];

const IssueFilters = ({
  activeStatus,
  activePriority,
  onStatusChange,
  onPriorityChange,
}: IssueFiltersProps) => {
  return (
    <Stack spacing={1.1}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ xs: "flex-start", sm: "center" }}>
        <Typography variant="caption" sx={{ color: "text.secondary", minWidth: 62 }}>
          Status
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {statusFilterOptions.map((option) => (
            <Button
              key={option.id}
              size="small"
              variant={option.id === activeStatus ? "contained" : "outlined"}
              onClick={() => onStatusChange(option.id)}
            >
              {option.title}
            </Button>
          ))}
        </Stack>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ xs: "flex-start", sm: "center" }}>
        <Typography variant="caption" sx={{ color: "text.secondary", minWidth: 62 }}>
          Priority
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {priorityFilterOptions.map((option) => (
            <Button
              key={option.id}
              size="small"
              variant={option.id === activePriority ? "contained" : "outlined"}
              onClick={() => onPriorityChange(option.id)}
            >
              {option.title}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default IssueFilters;
