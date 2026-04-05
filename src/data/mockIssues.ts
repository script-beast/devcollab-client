import type { Issue } from "../types/models";

const labelCatalog: Record<string, { color: string; description: string }> = {
  frontend: {
    color: "#2dd4bf",
    description: "Client-side UI and interaction updates.",
  },
  accessibility: {
    color: "#22d3ee",
    description: "Usability and accessibility enhancements.",
  },
  productivity: {
    color: "#f59e0b",
    description: "Workflow speed and developer efficiency improvements.",
  },
  "design-system": {
    color: "#fbbf24",
    description: "Reusable UI tokens and shared components.",
  },
  graphql: {
    color: "#a78bfa",
    description: "GraphQL schema, resolvers, and query behavior work.",
  },
  backend: {
    color: "#60a5fa",
    description: "API and server-side logic work.",
  },
  observability: {
    color: "#38bdf8",
    description: "Telemetry, logs, and tracing improvements.",
  },
  security: {
    color: "#f43f5e",
    description: "Security hardening and permission checks.",
  },
  auth: {
    color: "#fb7185",
    description: "Authentication and authorization implementation.",
  },
  infra: {
    color: "#94a3b8",
    description: "Infrastructure and deployment support work.",
  },
  ci: {
    color: "#10b981",
    description: "Continuous integration and pipeline workflows.",
  },
  analytics: {
    color: "#14b8a6",
    description: "Metrics, reporting, and analytical insights.",
  },
  automation: {
    color: "#34d399",
    description: "Build and release automation tasks.",
  },
  docs: {
    color: "#f97316",
    description: "Documentation and release-note updates.",
  },
};

const toIssueLabel = (name: string) => {
  const labelMeta = labelCatalog[name];

  if (!labelMeta) {
    return {
      name,
      color: "#64748b",
      description: "Custom issue label.",
    };
  }

  return {
    name,
    color: labelMeta.color,
    description: labelMeta.description,
  };
};

export const mockIssues: Issue[] = [
  {
    id: "ISS-1081",
    projectId: "devcollab-client-refresh",
    title: "Finalize keyboard shortcuts for issue triage",
    description:
      "Add consistent keyboard interactions for opening issue drawer, changing status, and assigning labels.",
    status: 1,
    priority: 2,
    labels: ["frontend", "accessibility", "productivity"].map(toIssueLabel),
    assignee: "Ankit",
    updatedAt: "2026-03-31T07:40:00.000Z",
    comments: [
      {
        id: "C-301",
        userName: "Ayesha",
        message:
          "Shortcut map is drafted. Need final conflict checks for browser-level bindings.",
        timestamp: "2026-03-31T07:10:00.000Z",
      },
      {
        id: "C-302",
        userName: "Rohit",
        message:
          "Tested with long issue lists. Opening drawer with Enter feels smooth.",
        timestamp: "2026-03-31T07:25:00.000Z",
      },
    ],
  },
  {
    id: "ISS-1084",
    projectId: "devcollab-client-refresh",
    title: "Introduce grouped label chips in issue card",
    description:
      "Show the most relevant labels while preserving context for large sets without visual noise.",
    status: 0,
    priority: 1,
    labels: ["frontend", "design-system"].map(toIssueLabel),
    assignee: "Shreya",
    updatedAt: "2026-03-30T19:10:00.000Z",
    comments: [
      {
        id: "C-303",
        userName: "Shreya",
        message: "I will prototype max-two labels with a +N overflow badge.",
        timestamp: "2026-03-30T18:52:00.000Z",
      },
    ],
  },
  {
    id: "ISS-1101",
    projectId: "apollo-gateway-v2",
    title: "Track federation-level resolver latency",
    description:
      "Capture resolver timings for each federated service and expose traces in the operations panel.",
    status: 1,
    priority: 2,
    labels: ["graphql", "backend", "observability"].map(toIssueLabel),
    assignee: "Neel",
    updatedAt: "2026-03-29T16:35:00.000Z",
    comments: [
      {
        id: "C-304",
        userName: "Neel",
        message:
          "PR is up with trace decorators and a low-overhead metrics adapter.",
        timestamp: "2026-03-29T15:50:00.000Z",
      },
      {
        id: "C-305",
        userName: "Ankit",
        message:
          "Looks good. Please add one failure-path test around timeouts.",
        timestamp: "2026-03-29T16:09:00.000Z",
      },
      {
        id: "C-307",
        userName: "Ankit",
        message:
          "Looks good. Please add one failure-path test around timeouts.",
        timestamp: "2026-03-29T16:09:00.000Z",
      },
      {
        id: "C-307",
        userName: "Ankit",
        message:
          "Looks good. Please add one failure-path test around timeouts.",
        timestamp: "2026-03-29T16:09:00.000Z",
      },
      {
        id: "C-307",
        userName: "Ankit",
        message:
          "Looks good. Please add one failure-path test around timeouts.",
        timestamp: "2026-03-29T16:09:00.000Z",
      },
      {
        id: "C-307",
        userName: "Ankit",
        message:
          "Looks good. Please add one failure-path test around timeouts.",
        timestamp: "2026-03-29T16:09:00.000Z",
      },
    ],
  },
  {
    id: "ISS-1118",
    projectId: "apollo-gateway-v2",
    title: "Enforce stricter project-scoped auth checks",
    description:
      "Prevent cross-project issue access by validating membership context before resolver execution.",
    status: 0,
    priority: 2,
    labels: ["security", "auth"].map(toIssueLabel),
    assignee: "Karan",
    updatedAt: "2026-03-28T13:18:00.000Z",
    comments: [
      {
        id: "C-306",
        userName: "Karan",
        message: "Drafted middleware guard shape; waiting on schema review.",
        timestamp: "2026-03-28T13:00:00.000Z",
      },
    ],
  },
  {
    id: "ISS-1127",
    projectId: "security-hardening",
    title: "Rotate signing secrets safely",
    description:
      "Implement rolling key support so sessions minted by previous secrets stay valid through the migration window.",
    status: 2,
    priority: 2,
    labels: ["security", "infra"].map(toIssueLabel),
    assignee: "Maya",
    updatedAt: "2026-03-24T11:20:00.000Z",
    comments: [
      {
        id: "C-307",
        userName: "Maya",
        message:
          "Blocked by infra policy update. Expecting approval this week.",
        timestamp: "2026-03-24T10:56:00.000Z",
      },
    ],
  },
  {
    id: "ISS-1132",
    projectId: "ci-observability",
    title: "Publish flaky test confidence score",
    description:
      "Score suites by recent instability and expose confidence in PR checks for maintainers.",
    status: 1,
    priority: 1,
    labels: ["ci", "analytics"].map(toIssueLabel),
    assignee: "Priya",
    updatedAt: "2026-03-27T15:48:00.000Z",
    comments: [
      {
        id: "C-308",
        userName: "Priya",
        message:
          "Confidence model is live locally; I am validating noisy edge cases.",
        timestamp: "2026-03-27T15:20:00.000Z",
      },
      {
        id: "C-309",
        userName: "Ayesha",
        message:
          "Please include a tooltip in the dashboard explaining score thresholds.",
        timestamp: "2026-03-27T15:39:00.000Z",
      },
    ],
  },
  {
    id: "ISS-1140",
    projectId: "release-automation",
    title: "Generate release notes from merged issue labels",
    description:
      "Group completed issues by label and produce a markdown summary for each tagged release.",
    status: 2,
    priority: 0,
    labels: ["automation", "docs"].map(toIssueLabel),
    assignee: "Rohit",
    updatedAt: "2026-03-30T18:00:00.000Z",
    comments: [
      {
        id: "C-310",
        userName: "Rohit",
        message: "Merged and validated with two historical release snapshots.",
        timestamp: "2026-03-30T17:44:00.000Z",
      },
    ],
  },
];
