import type { Theme } from "@mui/material/styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  issueStatusOptions,
  priorityOptions,
  projectMemberRoleOptions,
  projectStatusOptions,
  type IssuePriority,
  type IssueStatus,
  type ProjectMemberRole,
  type ProjectStatus,
} from "../types/models";

dayjs.extend(relativeTime);

interface FormatDateLabelOptions {
  withTime?: boolean;
  withYear?: boolean;
  relative?: boolean;
  format?: string;
  invalidFallback?: string;
}

const numericDatePattern = /^\d+$/;

export const toDayjs = (
  value: string | number | Date | null | undefined,
) => {
  if (value === null || value === undefined) {
    return dayjs(Number.NaN);
  }

  if (typeof value === "number") {
    return value <= 9_999_999_999 ? dayjs.unix(value) : dayjs(value);
  }

  if (value instanceof Date) {
    return dayjs(value);
  }

  const normalized = value.trim();

  if (!normalized) {
    return dayjs(Number.NaN);
  }

  if (numericDatePattern.test(normalized)) {
    const numericValue = Number(normalized);

    if (!Number.isFinite(numericValue)) {
      return dayjs(Number.NaN);
    }

    return normalized.length <= 10
      ? dayjs.unix(numericValue)
      : dayjs(numericValue);
  }

  return dayjs(normalized);
};

const getOptionLabel = (options: readonly string[], index: number): string => {
  return options[index] ?? "Unknown";
};

const toTitleCase = (value: string): string => {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const getProjectStatusLabel = (status: ProjectStatus): string => {
  return getOptionLabel(projectStatusOptions, status);
};

export const getIssueStatusLabel = (status: IssueStatus): string => {
  return getOptionLabel(issueStatusOptions, status);
};

export const getIssuePriorityLabel = (priority: IssuePriority): string => {
  return getOptionLabel(priorityOptions, priority);
};

export const getProjectMemberRoleLabel = (role: ProjectMemberRole): string => {
  return toTitleCase(getOptionLabel(projectMemberRoleOptions, role));
};

export const getProjectStatusTone = (theme: Theme, status: ProjectStatus): string => {
  if (status === 1) {
    return theme.palette.success.main;
  }

  if (status === 2) {
    return theme.palette.error.main;
  }

  return theme.palette.warning.main;
};

export const getIssueStatusTone = (theme: Theme, status: IssueStatus): string => {
  if (status === 2) {
    return theme.palette.success.main;
  }

  if (status === 1) {
    return theme.palette.warning.main;
  }

  return theme.palette.primary.main;
};

export const getIssuePriorityTone = (theme: Theme, priority: IssuePriority): string => {
  if (priority === 2) {
    return theme.palette.error.main;
  }

  if (priority === 1) {
    return theme.palette.warning.main;
  }

  return theme.palette.success.main;
};

export const formatDateLabel = (
  isoDate: string,
  options: FormatDateLabelOptions = {},
): string => {
  const {
    withTime = false,
    withYear = true,
    relative = false,
    format,
    invalidFallback = "-",
  } = options;

  const parsed = toDayjs(isoDate);

  if (!parsed.isValid()) {
    return invalidFallback;
  }

  if (relative) {
    return parsed.fromNow();
  }

  if (format) {
    return parsed.format(format);
  }

  if (withTime && withYear) {
    return parsed.format("MMM DD, YYYY hh:mm A");
  }

  if (withTime) {
    return parsed.format("MMM DD hh:mm A");
  }

  if (withYear) {
    return parsed.format("MMM DD, YYYY");
  }

  return parsed.format("MMM DD");
};

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
