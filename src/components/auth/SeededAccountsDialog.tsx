import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";

export type SeededAccount = {
  name: string;
  email: string;
  password: string;
};

interface SeededAccountsDialogProps {
  open: boolean;
  onClose: () => void;
  onUseAccount: (account: SeededAccount) => void;
}

const seededAccounts: SeededAccount[] = [
  {
    name: "Ava Sharma",
    email: "ava.sharma@devcollab.dev",
    password: "Password@123",
  },
  {
    name: "Liam Chen",
    email: "liam.chen@devcollab.dev",
    password: "Password@123",
  },
  {
    name: "Sofia Martinez",
    email: "sofia.martinez@devcollab.dev",
    password: "Password@123",
  },
  {
    name: "Noah Patel",
    email: "noah.patel@devcollab.dev",
    password: "Password@123",
  },
  {
    name: "Emma Wilson",
    email: "emma.wilson@devcollab.dev",
    password: "Password@123",
  },
  {
    name: "Ethan Brooks",
    email: "ethan.brooks@devcollab.dev",
    password: "Password@123",
  },
  {
    name: "Mia Garcia",
    email: "mia.garcia@devcollab.dev",
    password: "Password@123",
  },
];

const SeededAccountsDialog = ({ open, onClose, onUseAccount }: SeededAccountsDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Seeded User Accounts</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          Select an account to auto-fill login details.
        </Typography>

        <Stack spacing={1}>
          {seededAccounts.map((account) => (
            <Stack
              key={account.email}
              direction={{ xs: "column", sm: "row" }}
              spacing={1.2}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: "18px",
                p: 1.2,
              }}
            >
              <Stack spacing={0.3}>
                <Typography variant="subtitle2">{account.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {account.email}
                </Typography>
              </Stack>
              <Button
                type="button"
                size="small"
                variant="outlined"
                onClick={() => onUseAccount(account)}
              >
                Use Account
              </Button>
            </Stack>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SeededAccountsDialog;