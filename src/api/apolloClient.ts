import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { showToast } from "../helper/toast";

const AUTH_TOKEN_KEY = "devC-token";
const AUTH_USER_KEY = "devC-user";

let isAuthRedirectInProgress = false;
let lastToastMessage = "";
let lastToastAt = 0;

const clearAuthStorage = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

const extractErrorMessages = (error: unknown): string[] => {
  const messages = new Set<string>();

  if (error instanceof Error && error.message) {
    messages.add(error.message);
  }

  if (typeof error === "object" && error) {
    const candidate = error as {
      message?: unknown;
      errors?: Array<{ message?: unknown }>;
      result?: { errors?: Array<{ message?: unknown }> };
    };

    if (typeof candidate.message === "string") {
      messages.add(candidate.message);
    }

    candidate.errors?.forEach((entry) => {
      if (typeof entry.message === "string") {
        messages.add(entry.message);
      }
    });

    candidate.result?.errors?.forEach((entry) => {
      if (typeof entry.message === "string") {
        messages.add(entry.message);
      }
    });
  }

  return Array.from(messages);
};

const showServerErrorToast = (message: string) => {
  const normalized = message.trim();

  if (!normalized) {
    return;
  }

  const now = Date.now();

  if (normalized === lastToastMessage && now - lastToastAt < 2000) {
    return;
  }

  lastToastMessage = normalized;
  lastToastAt = now;
  showToast(normalized);
};

const isUnauthorizedStatus = (error: unknown): boolean => {
  if (typeof error !== "object" || !error) {
    return false;
  }

  const candidate = error as { statusCode?: unknown; status?: unknown };

  return (
    candidate.statusCode === 401 ||
    candidate.statusCode === 403 ||
    candidate.status === 401 ||
    candidate.status === 403
  );
};

const isAuthError = (error: unknown): boolean => {
  const authKeywords = [
    "not authenticated",
    "unauthorized",
    "forbidden",
    "invalid token",
    "token expired",
    "jwt",
  ];

  if (isUnauthorizedStatus(error)) {
    return true;
  }

  const messages = extractErrorMessages(error).map((message) =>
    message.toLowerCase(),
  );
  return messages.some((message) =>
    authKeywords.some((keyword) => message.includes(keyword)),
  );
};

const redirectToLogin = () => {
  if (isAuthRedirectInProgress) {
    return;
  }

  isAuthRedirectInProgress = true;
  clearAuthStorage();

  const isAuthPage =
    window.location.pathname === "/login" ||
    window.location.pathname === "/register";

  if (isAuthPage) {
    isAuthRedirectInProgress = false;
    return;
  }

  window.location.replace("/login");
};

const httpLink = new HttpLink({ uri: "http://localhost:5000/graphql" });

const authLink = new SetContextLink(({ headers }) => {
  const t = localStorage.getItem(AUTH_TOKEN_KEY) ?? "";
  return { headers: { ...headers, Authorization: t ? `Bearer ${t}` : "" } };
});

const authErrorLink = new ErrorLink(({ error }) => {
  const messages = extractErrorMessages(error);

  if (isAuthError(error)) {
    showServerErrorToast(
      messages[0] ?? "Session expired. Please sign in again.",
    );
    redirectToLogin();
    return;
  }

  showServerErrorToast(messages[0] ?? "Request failed. Please try again.");
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([authErrorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
