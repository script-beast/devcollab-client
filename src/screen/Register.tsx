import React from "react";
import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@apollo/client/react";
import { Link as RouterLink, useNavigate } from "react-router";
import AuthShell from "../components/auth/AuthShell";
import { REGISTER_MUTATION } from "../graphql/auth.graphql";
import { useAuth } from "../contexts/AuthContext";
import type {
  RegisterMutationData,
  RegisterMutationVariables,
} from "../types/api";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorText, setErrorText] = React.useState("");
  const [runRegister, { loading }] = useMutation<
    RegisterMutationData,
    RegisterMutationVariables
  >(REGISTER_MUTATION);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorText("");

    try {
      const response = await runRegister({
        variables: {
          username: username.trim(),
          email: email.trim(),
          password,
        },
      });

      const payload = response.data?.signUp;

      if (!payload?.token || !payload?.user?.id) {
        throw new Error("Invalid signup response");
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
        error instanceof Error ? error.message : "Unable to create account",
      );
    }
  };

  return (
    <AuthShell
      eyebrow="Get Started"
      title="Create your DevCollab account"
      description="Set up your developer workspace profile to start managing projects and issue flows."
      footer={
        <Typography variant="body2">
          Already have an account?{" "}
          <Link component={RouterLink} to="/login" underline="hover" color="primary.main">
            Sign in
          </Link>
        </Typography>
      }
    >
      <Stack component="form" spacing={1.8} onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          fullWidth
        />
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

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </Stack>
    </AuthShell>
  );
};

export default Register;
