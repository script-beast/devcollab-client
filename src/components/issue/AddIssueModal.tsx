import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { FiPlus, FiX } from "react-icons/fi";
import {
  priorityOptions,
  type CreateIssueInput,
  type IssueLabel,
  type IssuePriority,
  type IssueStatus,
  type ProjectMember,
} from "../../types/models";

interface AddIssueModalProps {
  open: boolean;
  members: ProjectMember[];
  labelOptions: IssueLabel[];
  onClose: () => void;
  onCreate: (issue: CreateIssueInput) => void;
}

interface AddIssueFormState {
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  labels: IssueLabel[];
  assignee: string;
}

const getInitialFormState = (members: ProjectMember[]): AddIssueFormState => ({
  title: "",
  description: "",
  status: 0,
  priority: 1,
  labels: [],
  assignee: members[0]?.name ?? "",
});

const normalizeLabels = (values: IssueLabel[]): IssueLabel[] => {
  const uniqueByName = new Map<string, IssueLabel>();

  values.forEach((label) => {
    const normalizedName = label.name.trim();
    const key = normalizedName.toLowerCase();

    if (!normalizedName || uniqueByName.has(key)) {
      return;
    }

    uniqueByName.set(key, {
      ...label,
      name: normalizedName,
      description: label.description.trim() || "No description provided yet.",
    });
  });

  return Array.from(uniqueByName.values());
};

const AddIssueModal = ({
  open,
  members,
  labelOptions,
  onClose,
  onCreate,
}: AddIssueModalProps) => {
  const [submitted, setSubmitted] = React.useState(false);
  const [formState, setFormState] = React.useState<AddIssueFormState>(
    getInitialFormState(members),
  );

  const assigneeOptions = React.useMemo(() => {
    const names = members.map((member) => member.name);
    return names.length > 0 ? names : ["Unassigned"];
  }, [members]);

  React.useEffect(() => {
    if (open) {
      setFormState(getInitialFormState(members));
      setSubmitted(false);
    }
  }, [members, open]);

  const closeModal = () => {
    setFormState(getInitialFormState(members));
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = () => {
    setSubmitted(true);

    const title = formState.title.trim();

    if (!title) {
      return;
    }

    onCreate({
      title,
      description:
        formState.description.trim() || "No description provided yet.",
      status: formState.status,
      priority: formState.priority,
      labels: normalizeLabels(formState.labels),
      assignee: formState.assignee || "Unassigned",
    });

    closeModal();
  };

  return (
    <Dialog open={open} onClose={closeModal} fullWidth maxWidth="sm">
      <DialogTitle>Create Issue</DialogTitle>
      <DialogContent>
        <Stack spacing={1.8} sx={{ mt: 0.6 }}>
          <TextField
            label="Issue Title"
            value={formState.title}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                title: event.target.value,
              }))
            }
            error={submitted && !formState.title.trim()}
            helperText={
              submitted && !formState.title.trim()
                ? "Issue title is required."
                : ""
            }
            fullWidth
            autoFocus
          />

          <TextField
            label="Description"
            value={formState.description}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
            multiline
            minRows={3}
            fullWidth
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
            <TextField
              select
              label="Priority"
              value={formState.priority}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  priority: Number(event.target.value) as IssuePriority,
                }))
              }
              fullWidth
            >
              {priorityOptions.map((priority, index) => (
                <MenuItem key={priority} value={index}>
                  {priority}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Autocomplete<string, false, false, false>
            options={assigneeOptions}
            value={formState.assignee || null}
            onChange={(_, value) =>
              setFormState((current) => ({
                ...current,
                assignee: value ?? "",
              }))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Assignee"
                fullWidth
                error={submitted && !formState.assignee}
                helperText={
                  submitted && !formState.assignee
                    ? "Please select an assignee"
                    : ""
                }
              />
            )}
            fullWidth
          />

          <Autocomplete<IssueLabel, true, false, true>
            multiple
            options={labelOptions}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.name
            }
            value={formState.labels}
            onChange={(_, value) =>
              setFormState((current) => ({
                ...current,
                labels: normalizeLabels(
                  value.map((entry) => {
                    if (typeof entry !== "string") {
                      return entry;
                    }

                    return {
                      name: entry,
                      color: "#64748b",
                      description: "Custom issue label.",
                    };
                  }),
                ),
              }))
            }
            filterSelectedOptions
            renderOption={(props, option) => (
              <Box
                component="li"
                {...props}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: option.color,
                    border: "1px solid",
                    borderColor: "border.subtle",
                    flexShrink: 0,
                  }}
                />
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Labels"
                placeholder="Type and press Enter"
                helperText="Multiple labels supported. New labels get default color and description."
                fullWidth
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button
          variant="outlined"
          onClick={closeModal}
          startIcon={<FiX size={14} />}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          startIcon={<FiPlus size={14} />}
        >
          Create Issue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddIssueModal;
