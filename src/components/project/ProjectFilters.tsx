import { Button, Stack } from "@mui/material";
import { projectStatusOptions, type ProjectStatus } from "../../types/models";

export type ProjectFilterValue = -1 | ProjectStatus;

interface ProjectFiltersProps {
  active: ProjectFilterValue;
  onChange: (nextFilter: ProjectFilterValue) => void;
}

const filterOptions: { id: ProjectFilterValue; title: string }[] = [
  { id: -1, title: "All" },
  ...projectStatusOptions.map((status, index) => ({
    id: index as ProjectStatus,
    title: status,
  })),
];

const ProjectFilters = ({ active, onChange }: ProjectFiltersProps) => {
  return (
    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
      {filterOptions.map((status) => (
        <Button
          key={status.id}
          size="small"
          variant={status.id === active ? "contained" : "outlined"}
          onClick={() => onChange(status.id)}
        >
          {status.title}
        </Button>
      ))}
    </Stack>
  );
};

export default ProjectFilters;
