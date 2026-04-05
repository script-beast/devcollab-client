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
import { FiSend, FiX } from "react-icons/fi";

interface AddCommentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (message: string) => void;
}

const AddCommentModal = ({ open, onClose, onSubmit }: AddCommentModalProps) => {
  const [message, setMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const closeModal = () => {
    setMessage("");
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = () => {
    setSubmitted(true);

    const value = message.trim();

    if (!value) {
      return;
    }

    onSubmit(value);
    closeModal();
  };

  return (
    <Dialog open={open} onClose={closeModal} fullWidth maxWidth="sm">
      <DialogTitle>Add Comment</DialogTitle>
      <DialogContent>
        <Stack spacing={1.5} sx={{ mt: 0.6 }}>
          <TextField
            label="Comment"
            multiline
            minRows={4}
            maxRows={8}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            error={submitted && !message.trim()}
            helperText={submitted && !message.trim() ? "Comment cannot be empty." : ""}
            placeholder="Share your update, blocker, or suggestion..."
            fullWidth
            autoFocus
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button variant="outlined" onClick={closeModal} startIcon={<FiX size={14} />}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} startIcon={<FiSend size={14} />}>
          Add Comment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCommentModal;
