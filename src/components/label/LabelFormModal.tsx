import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FiCheck, FiPlus, FiX } from "react-icons/fi";
import type { CreateLabelInput, Label } from "../../types/models";

interface LabelFormModalProps {
  open: boolean;
  mode: "create" | "edit";
  initialValue?: Label | null;
  existingNames: string[];
  onClose: () => void;
  onSubmit: (input: CreateLabelInput) => void;
}

interface LabelFormState {
  name: string;
  color: string;
  description: string;
}

const colorPresets = [
  "#2dd4bf",
  "#60a5fa",
  "#f43f5e",
  "#fbbf24",
  "#34d399",
  "#a78bfa",
  "#22d3ee",
  "#f97316",
];

const defaultFormState: LabelFormState = {
  name: "",
  color: "#2dd4bf",
  description: "",
};

const normalizeName = (value: string) => value.trim().replace(/\s+/g, " ");

const isHexColor = (value: string) => /^#[0-9a-fA-F]{6}$/.test(value.trim());

const LabelFormModal = ({
  open,
  mode,
  initialValue,
  existingNames,
  onClose,
  onSubmit,
}: LabelFormModalProps) => {
  const [submitted, setSubmitted] = React.useState(false);
  const [formState, setFormState] = React.useState<LabelFormState>(defaultFormState);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    if (mode === "edit" && initialValue) {
      setFormState({
        name: initialValue.name,
        color: initialValue.color,
        description: initialValue.description,
      });
      setSubmitted(false);
      return;
    }

    setFormState(defaultFormState);
    setSubmitted(false);
  }, [initialValue, mode, open]);

  const normalizedName = normalizeName(formState.name);
  const normalizedInitialName = normalizeName(initialValue?.name ?? "").toLowerCase();
  const hasDuplicateName = existingNames.some((name) => {
    const normalizedExisting = normalizeName(name).toLowerCase();

    if (!normalizedExisting) {
      return false;
    }

    if (mode === "edit" && normalizedExisting === normalizedInitialName) {
      return false;
    }

    return normalizedExisting === normalizedName.toLowerCase();
  });

  const invalidName = submitted && !normalizedName;
  const invalidColor = submitted && !isHexColor(formState.color);
  const duplicateName = submitted && hasDuplicateName;

  const closeModal = () => {
    setFormState(defaultFormState);
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = () => {
    setSubmitted(true);

    if (!normalizedName || !isHexColor(formState.color) || hasDuplicateName) {
      return;
    }

    onSubmit({
      name: normalizedName,
      color: formState.color.trim(),
      description: formState.description.trim() || "No description yet.",
    });

    closeModal();
  };

  const title = mode === "create" ? "Create Label" : "Edit Label";

  return (
    <Dialog open={open} onClose={closeModal} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={1.8} sx={{ mt: 0.6 }}>
          <TextField
            label="Name"
            value={formState.name}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                name: event.target.value,
              }))
            }
            error={invalidName || duplicateName}
            helperText={
              invalidName
                ? "Label name is required."
                : duplicateName
                  ? "A label with this name already exists."
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

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} alignItems={{ xs: "stretch", sm: "center" }}>
            <TextField
              label="Color"
              value={formState.color}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  color: event.target.value,
                }))
              }
              error={invalidColor}
              helperText={invalidColor ? "Use a valid hex color (example: #2dd4bf)." : ""}
              fullWidth
            />
            <Box
              sx={{
                width: { xs: "100%", sm: 64 },
                height: 44,
                borderRadius: 1.4,
                border: "1px solid",
                borderColor: "border.subtle",
                backgroundColor: isHexColor(formState.color) ? formState.color : "transparent",
              }}
            />
          </Stack>

          <Stack direction="row" spacing={0.8} useFlexGap flexWrap="wrap">
            {colorPresets.map((color) => (
              <Box
                key={color}
                component="button"
                type="button"
                aria-label={`Select ${color}`}
                onClick={() =>
                  setFormState((current) => ({
                    ...current,
                    color,
                  }))
                }
                sx={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor: formState.color.toLowerCase() === color.toLowerCase() ? "common.white" : "transparent",
                  backgroundColor: color,
                  cursor: "pointer",
                }}
              />
            ))}
          </Stack>

          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Tip: choose a unique color to make this label easier to spot across issue cards.
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button variant="outlined" onClick={closeModal} startIcon={<FiX size={14} />}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          startIcon={mode === "create" ? <FiPlus size={14} /> : <FiCheck size={14} />}
        >
          {mode === "create" ? "Create Label" : "Update Label"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LabelFormModal;
