import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useQuery } from "@apollo/client/react";
import EmptyState from "../components/common/EmptyState";
import GlassCard from "../components/common/GlassCard";
import PageHeader from "../components/common/PageHeader";
import TagChip from "../components/common/TagChip";
import { GET_WORKSPACE_ISSUES_QUERY } from "../graphql/issue.graphql";
import { GET_PROJECTS_QUERY } from "../graphql/project.graphql";
import { getIssueStatusLabel, toDayjs } from "../helper";
import type {
  ApiIssue,
  GetProjectsQueryData,
  GetWorkspaceIssuesQueryData,
} from "../types/api";
import type { IssueStatus } from "../types/models";

const statusOrder: IssueStatus[] = [0, 1, 2];

const BoardPage = () => {
  const {
    data: projectsData,
    error: projectsError,
    refetch: refetchProjects,
  } = useQuery<GetProjectsQueryData>(GET_PROJECTS_QUERY, {
    fetchPolicy: "network-only",
  });

  const {
    data: issuesData,
    loading: issuesLoading,
    error: issuesError,
    refetch: refetchIssues,
  } = useQuery<GetWorkspaceIssuesQueryData>(GET_WORKSPACE_ISSUES_QUERY, {
    fetchPolicy: "network-only",
  });

  const projectNameById = React.useMemo(() => {
    const projects = projectsData?.projects.data ?? [];
    return Object.fromEntries(projects.map((project) => [project.id, project.name]));
  }, [projectsData]);

  const workspaceIssues = React.useMemo<ApiIssue[]>(() => {
    return issuesData?.workspaceIssues ?? [];
  }, [issuesData]);

  const issuesByStatus = Object.fromEntries(
    statusOrder.map((status) => [
      status,
      workspaceIssues
        .filter((issue) => issue.status === status)
        .sort(
          (left, right) =>
            toDayjs(right.updatedAt).valueOf() -
            toDayjs(left.updatedAt).valueOf(),
        ),
    ]),
  ) as Record<IssueStatus, ApiIssue[]>;

  if (projectsError || issuesError) {
    return (
      <EmptyState
        title="Unable to load board"
        description={projectsError?.message ?? issuesError?.message ?? "Unknown error"}
        actionLabel="Retry"
        onAction={() => {
          void Promise.all([refetchProjects(), refetchIssues()]);
        }}
      />
    );
  }

  if (issuesLoading && workspaceIssues.length === 0) {
    return (
      <EmptyState
        title="Loading board"
        description="Fetching workspace issues for board columns."
      />
    );
  }

  return (
    <Stack spacing={2.4}>
      <PageHeader
        eyebrow="Read-Only Board"
        title="Board"
        description="View issue distribution across workflow stages. This board is view-only with no drag-drop or update actions."
      />

      <Box
        sx={{
          display: "grid",
          gap: 1.4,
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(3, minmax(0, 1fr))",
          },
          alignItems: "start",
        }}
      >
        {statusOrder.map((status) => {
          const statusIssues = issuesByStatus[status];

          return (
            <GlassCard key={status} sx={{ p: 1.2, display: "grid", gap: 1.1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2">{getIssueStatusLabel(status)}</Typography>
                <Chip
                  size="small"
                  label={statusIssues.length}
                  sx={(theme) => ({
                    color: theme.palette.text.secondary,
                    backgroundColor: alpha(theme.palette.common.white, 0.08),
                  })}
                />
              </Stack>

              <Stack spacing={1}>
                {statusIssues.length === 0 && (
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    No issues in this column.
                  </Typography>
                )}

                {statusIssues.map((issue) => (
                  <Box
                    key={issue.id}
                    sx={(theme) => ({
                      p: 1.1,
                      borderRadius: "18px",
                      border: `1px solid ${theme.palette.border.subtle}`,
                      backgroundColor: alpha(theme.palette.common.white, 0.03),
                    })}
                  >
                    <Typography variant="subtitle2" sx={{ fontSize: "0.84rem" }}>
                      {issue.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.4 }}>
                      {projectNameById[issue.projectId] ?? "Unknown Project"}
                    </Typography>
                    <Stack direction="row" spacing={0.6} useFlexGap flexWrap="wrap" sx={{ mt: 0.8 }}>
                      {issue.labels.slice(0, 2).map((label) => (
                        <TagChip key={label.name} label={label} />
                      ))}
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </GlassCard>
          );
        })}
      </Box>
    </Stack>
  );
};

export default BoardPage;
