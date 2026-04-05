import React from "react";
import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@apollo/client/react";
import { Link as RouterLink, useNavigate } from "react-router";
import AuthShell from "../components/auth/AuthShell";
import SeededAccountsDialog, {
  type SeededAccount,
} from "../components/auth/SeededAccountsDialog";
import { LOGIN_MUTATION } from "../graphql/auth.graphql";
import { useAuth } from "../contexts/AuthContext";
import type { LoginMutationData, LoginMutationVariables } from "../types/api";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorText, setErrorText] = React.useState("");
  const [seedDialogOpen, setSeedDialogOpen] = React.useState(false);
  const [runLogin, { loading }] = useMutation<
    LoginMutationData,
    LoginMutationVariables
  >(LOGIN_MUTATION);

  const handleUseSeededAccount = (account: SeededAccount) => {
    setEmail(account.email);
    setPassword(account.password);
    setErrorText("");
    setSeedDialogOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorText("");

    try {
      const response = await runLogin({
        variables: {
          email: email.trim(),
          password,
        },
      });

      const payload = response.data?.login;

      if (!payload?.token || !payload?.user?.id) {
        throw new Error("Invalid login response");
      }

      login(payload.token, {
        id: payload.user.id,
        username: payload.user.name,
        email: payload.user.email,
        avatar: payload.user.avatar ?? "",
      });

      navigate("/projects", { replace: true });
    } catch (error: unknown) {
      setErrorText(
        error instanceof Error ? error.message : "Unable to sign in",
      );
    }
  };

  return (
    <AuthShell
      eyebrow="Welcome Back"
      title="Sign in to DevCollab"
      description="Use your workspace credentials to continue to projects, issues, and team workflows."
      footer={
        <Typography variant="body2">
          New to DevCollab?{" "}
          <Link
            component={RouterLink}
            to="/register"
            underline="hover"
            color="primary.main"
          >
            Create an account
          </Link>
        </Typography>
      }
    >
      <Stack component="form" spacing={1.8} onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          fullWidth
        />

        {errorText ? (
          <Typography variant="body2" color="error.main">
            {errorText}
          </Typography>
        ) : null}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Button
            type="button"
            variant="outlined"
            size="large"
            fullWidth
            onClick={() => setSeedDialogOpen(true)}
            sx={{ px: 3, minWidth: 0, borderRadius: "18px" }}
          >
            View Seeded Accounts
          </Button>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Stack>
      </Stack>

      <SeededAccountsDialog
        open={seedDialogOpen}
        onClose={() => setSeedDialogOpen(false)}
        onUseAccount={handleUseSeededAccount}
      />
    </AuthShell>
  );
};

export default Login;
