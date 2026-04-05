import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { FiFolderPlus, FiX } from "react-icons/fi";
import { type CreateProjectInput } from "../../types/models";

interface AddProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (project: CreateProjectInput) => void;
}

const initialFormState: CreateProjectInput = {
  name: "",
  description: "",
};

const AddProjectModal = ({ open, onClose, onCreate }: AddProjectModalProps) => {
  const [formState, setFormState] =
    React.useState<CreateProjectInput>(initialFormState);
  const [submitted, setSubmitted] = React.useState(false);

  const closeModal = () => {
    setFormState(initialFormState);
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = () => {
    setSubmitted(true);

    if (!formState.name.trim()) {
      return;
    }

    onCreate({
      name: formState.name.trim(),
      description: formState.description.trim() || "No description added yet.",
    });

    closeModal();
  };

  return (
    <Dialog open={open} onClose={closeModal} fullWidth maxWidth="sm">
      <DialogTitle>Create New Project</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Project Name"
            value={formState.name}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                name: event.target.value,
              }))
            }
            error={submitted && !formState.name.trim()}
            helperText={
              submitted && !formState.name.trim()
                ? "Project name is required."
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
          startIcon={<FiFolderPlus size={14} />}
        >
          Create Project
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProjectModal;
