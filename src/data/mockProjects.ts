import type { Project } from "../types/models";

export const mockProjects: Project[] = [
  {
    id: "apollo-gateway-v2",
    name: "Apollo Gateway v2",
    description:
      "Upgrade the federation gateway with stronger auth boundaries and streamlined observability.",
    issueCount: 14,
    updatedAt: "2026-03-29T09:42:00.000Z",
    progress: 72,
    status: 0,
  },
  {
    id: "devcollab-client-refresh",
    name: "Client UX Refresh",
    description:
      "Ship a sharper project workspace with better issue triage, filters, and keyboard-first navigation.",
    issueCount: 21,
    updatedAt: "2026-03-31T08:05:00.000Z",
    progress: 58,
    status: 0,
  },
  {
    id: "ci-observability",
    name: "CI Observability",
    description:
      "Introduce flaky test dashboards and release confidence scoring for deployment pipelines.",
    issueCount: 9,
    updatedAt: "2026-03-27T14:30:00.000Z",
    progress: 34,
    status: 1,
  },
  {
    id: "security-hardening",
    name: "Security Hardening",
    description:
      "Audit dependency upgrades, session security, and permission escalation checks.",
    issueCount: 7,
    updatedAt: "2026-03-23T12:15:00.000Z",
    progress: 44,
    status: 2,
  },
  {
    id: "release-automation",
    name: "Release Automation",
    description:
      "Automate changelog generation and rollout annotations from merged issue metadata.",
    issueCount: 12,
    updatedAt: "2026-03-30T18:22:00.000Z",
    progress: 88,
    status: 1,
  },
];
