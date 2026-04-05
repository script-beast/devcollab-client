import React from "react";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useQuery } from "@apollo/client/react";
import dayjs from "dayjs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import EmptyState from "../components/common/EmptyState";
import GlassCard from "../components/common/GlassCard";
import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/common/StatCard";
import { GET_WORKSPACE_ISSUES_QUERY } from "../graphql/issue.graphql";
import { GET_PROJECTS_QUERY } from "../graphql/project.graphql";
import { toDayjs } from "../helper";
import type {
  ApiIssue,
  ApiProject,
  GetProjectsQueryData,
  GetWorkspaceIssuesQueryData,
} from "../types/api";
import { issueStatusOptions } from "../types/models";

const InsightsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const projects = React.useMemo<ApiProject[]>(() => {
    return projectsData?.projects.data ?? [];
  }, [projectsData]);

  const issues = React.useMemo<ApiIssue[]>(() => {
    return issuesData?.workspaceIssues ?? [];
  }, [issuesData]);

  const issueStatusData = React.useMemo(
    () =>
      issueStatusOptions
        .map((status, index) => ({
          name: status,
          value: issues.filter((issue) => issue.status === index).length,
        }))
        .filter((entry) => entry.value > 0),
    [issues],
  );

  const progressData = React.useMemo(
    () =>
      projects.map((project) => ({
        name:
          project.name.length > 16
            ? `${project.name.slice(0, 16)}...`
            : project.name,
        progress: project.progress,
      })),
    [projects],
  );

  const activityData = React.useMemo(() => {
    const today = dayjs();
    const dateKeys = Array.from({ length: 7 }, (_, index) =>
      today.subtract(6 - index, "day").format("YYYY-MM-DD"),
    );

    return dateKeys.map((dateKey) => {
      const issuesCount = issues.filter(
        (issue) => toDayjs(issue.updatedAt).format("YYYY-MM-DD") === dateKey,
      ).length;

      return {
        day: dayjs(dateKey).format("ddd"),
        issues: issuesCount,
      };
    });
  }, [issues]);

  const closedIssues = issues.filter((issue) => issue.status === 2).length;
  const completionRate = Math.round(
    (closedIssues / Math.max(issues.length, 1)) * 100,
  );
  const progressChartWidth = Math.max(progressData.length * 130, 640);
  const activityChartWidth = Math.max(activityData.length * 92, 640);

  const pieColors = [
    theme.palette.primary.main,
    theme.palette.info.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.success.main,
  ];

  if (projectsError || issuesError) {
    return (
      <EmptyState
        title="Unable to load insights"
        description={projectsError?.message ?? issuesError?.message ?? "Unknown error"}
        actionLabel="Retry"
        onAction={() => {
          void Promise.all([refetchProjects(), refetchIssues()]);
        }}
      />
    );
  }

  if (issuesLoading && issues.length === 0) {
    return (
      <EmptyState
        title="Loading insights"
        description="Calculating workspace analytics from live issue and project data."
      />
    );
  }

  return (
    <Stack spacing={2.4} sx={{ minWidth: 0, overflowX: "hidden" }}>
      <PageHeader
        eyebrow="Engineering Analytics"
        title="Insights"
        description="Track issue flow health, project progress, and recent delivery activity from your DevCollab workspace."
      />

      <Box
        sx={{
          display: "grid",
          gap: 1.2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(4, minmax(0, 1fr))",
          },
        }}
      >
        <StatCard
          label="Projects"
          value={projects.length}
          helperText="Tracked across workspace"
        />
        <StatCard
          label="Issues"
          value={issues.length}
          helperText="Total active + resolved"
        />
        <StatCard
          label="Completion"
          value={`${completionRate}%`}
          helperText="Done issue ratio"
          tone="success"
        />
        <StatCard
          label="Closed"
          value={closedIssues}
          helperText="Resolved issues"
          tone="success"
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 1.6,
          gridTemplateColumns: {
            xs: "1fr",
            xl: "1.1fr 1fr",
          },
          alignItems: "stretch",
          "& > *": {
            minWidth: 0,
          },
        }}
      >
        <GlassCard sx={{ p: 2, minWidth: 0, overflow: "hidden" }}>
          <Typography variant="h3" sx={{ fontSize: "1rem", mb: 1.4 }}>
            Issue Status Distribution
          </Typography>
          <Box sx={{ width: "100%", height: 250, minWidth: 0 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={issueStatusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={92}
                  paddingAngle={2}
                >
                  {issueStatusData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: alpha(
                      theme.palette.background.paper,
                      0.96,
                    ),
                    borderColor: theme.palette.border.subtle,
                    borderRadius: 10,
                    color: theme.palette.text.primary,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            justifyContent="center"
            sx={{ mt: 1 }}
          >
            {issueStatusData.map((entry, index) => (
              <Stack
                key={entry.name}
                direction="row"
                spacing={0.5}
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    backgroundColor: pieColors[index % pieColors.length],
                  }}
                />
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {entry.name}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </GlassCard>

        <GlassCard sx={{ p: 2, minWidth: 0 }}>
          <Typography variant="h3" sx={{ fontSize: "1rem", mb: 1.4 }}>
            Project Progress
          </Typography>
          <Box
            sx={{
              width: "100%",
              maxWidth: "100%",
              minWidth: 0,
              overflowX: isMobile ? "auto" : "visible",
              overflowY: "hidden",
              WebkitOverflowScrolling: "touch",
              touchAction: isMobile ? "pan-x" : "auto",
              pb: { xs: 1, md: 0 },
            }}
          >
            {isMobile ? (
              <Box
                sx={{
                  width: progressChartWidth,
                  height: 290,
                  display: "inline-block",
                }}
              >
                <BarChart
                  width={progressChartWidth}
                  height={290}
                  data={progressData}
                  margin={{ left: 6, right: 12, bottom: 14 }}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke={alpha(theme.palette.common.white, 0.12)}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: theme.palette.text.secondary, fontSize: 11 }}
                  />
                  <YAxis
                    tick={{ fill: theme.palette.text.secondary, fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: alpha(
                        theme.palette.background.paper,
                        0.96,
                      ),
                      borderColor: theme.palette.border.subtle,
                      borderRadius: 10,
                      color: theme.palette.text.primary,
                    }}
                  />
                  <Bar
                    dataKey="progress"
                    fill={theme.palette.primary.main}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </Box>
            ) : (
              <Box sx={{ width: "100%", height: 290 }}>
                <ResponsiveContainer>
                  <BarChart
                    data={progressData}
                    margin={{ left: 6, right: 12, bottom: 14 }}
                  >
                    <CartesianGrid
                      strokeDasharray="4 4"
                      stroke={alpha(theme.palette.common.white, 0.12)}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{
                        fill: theme.palette.text.secondary,
                        fontSize: 11,
                      }}
                    />
                    <YAxis
                      tick={{
                        fill: theme.palette.text.secondary,
                        fontSize: 11,
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: alpha(
                          theme.palette.background.paper,
                          0.96,
                        ),
                        borderColor: theme.palette.border.subtle,
                        borderRadius: 10,
                        color: theme.palette.text.primary,
                      }}
                    />
                    <Bar
                      dataKey="progress"
                      fill={theme.palette.primary.main}
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            )}
          </Box>
        </GlassCard>
      </Box>

      <GlassCard sx={{ p: 2, minWidth: 0 }}>
        <Typography variant="h3" sx={{ fontSize: "1rem", mb: 1.4 }}>
          Update Activity (Last 7 Days)
        </Typography>
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            minWidth: 0,
            overflowX: isMobile ? "auto" : "visible",
            overflowY: "hidden",
            WebkitOverflowScrolling: "touch",
            touchAction: isMobile ? "pan-x" : "auto",
            pb: { xs: 1, md: 0 },
          }}
        >
          {isMobile ? (
            <Box
              sx={{
                width: activityChartWidth,
                height: 260,
                display: "inline-block",
              }}
            >
              <LineChart
                width={activityChartWidth}
                height={260}
                data={activityData}
                margin={{ left: 6, right: 12 }}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke={alpha(theme.palette.common.white, 0.12)}
                />
                <XAxis
                  dataKey="day"
                  tick={{ fill: theme.palette.text.secondary, fontSize: 11 }}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: theme.palette.text.secondary, fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: alpha(
                      theme.palette.background.paper,
                      0.96,
                    ),
                    borderColor: theme.palette.border.subtle,
                    borderRadius: 10,
                    color: theme.palette.text.primary,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="issues"
                  stroke={theme.palette.secondary.main}
                  strokeWidth={2.6}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </Box>
          ) : (
            <Box sx={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <LineChart data={activityData} margin={{ left: 6, right: 12 }}>
                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke={alpha(theme.palette.common.white, 0.12)}
                  />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: theme.palette.text.secondary, fontSize: 11 }}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: theme.palette.text.secondary, fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: alpha(
                        theme.palette.background.paper,
                        0.96,
                      ),
                      borderColor: theme.palette.border.subtle,
                      borderRadius: 10,
                      color: theme.palette.text.primary,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="issues"
                    stroke={theme.palette.secondary.main}
                    strokeWidth={2.6}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Box>
      </GlassCard>
    </Stack>
  );
};

export default InsightsPage;
