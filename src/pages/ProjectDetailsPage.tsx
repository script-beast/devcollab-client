import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { useMutation, useQuery } from "@apollo/client/react";
import { useNavigate, useParams } from "react-router";
import EmptyState from "../components/common/EmptyState";
import GlassCard from "../components/common/GlassCard";
import AddIssueModal from "../components/issue/AddIssueModal";
import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import StatCard from "../components/common/StatCard";
import IssueCard from "../components/issue/IssueCard";
import IssueDrawer from "../components/issue/IssueDrawer";
import IssueFilters, {
  type PriorityFilterValue,
  type StatusFilterValue,
} from "../components/issue/IssueFilters";
import ProjectMemberList from "../components/project/ProjectMemberList";
import TeamDrawer from "../components/project/TeamDrawer";
import { useAuth } from "../contexts/AuthContext";
import { CREATE_COMMENT_MUTATION } from "../graphql/comment.graphql";
import {
  CREATE_ISSUE_MUTATION,
  DELETE_ISSUE_MUTATION,
  GET_PROJECT_ISSUES_QUERY,
  UPDATE_ISSUE_STATUS_MUTATION,
} from "../graphql/issue.graphql";
import {
  ADD_PROJECT_MEMBER_MUTATION,
  GET_AVAILABLE_PROJECT_USERS_QUERY,
  REMOVE_PROJECT_MEMBER_MUTATION,
  UPDATE_PROJECT_MEMBER_ROLE_MUTATION,
} from "../graphql/projectMember.graphql";
import { GET_PROJECT_QUERY } from "../graphql/project.graphql";
import { GET_LABELS_QUERY } from "../graphql/label.graphql";
import { getIssuePriorityLabel, getIssueStatusLabel } from "../helper";
import type {
  AddProjectMemberMutationData,
  AddProjectMemberMutationVariables,
  ApiIssue,
  ApiLabel,
  ApiMemberCandidate,
  ApiProjectMember,
  CreateCommentMutationData,
  CreateCommentMutationVariables,
  CreateIssueMutationData,
  CreateIssueMutationVariables,
  DeleteIssueMutationData,
  DeleteIssueMutationVariables,
  GetAvailableProjectUsersQueryData,
  GetAvailableProjectUsersQueryVariables,
  GetLabelsQueryData,
  GetProjectIssuesQueryData,
  GetProjectIssuesQueryVariables,
  GetProjectQueryData,
  GetProjectQueryVariables,
  RemoveProjectMemberMutationData,
  RemoveProjectMemberMutationVariables,
  UpdateIssueStatusMutationData,
  UpdateIssueStatusMutationVariables,
  UpdateProjectMemberRoleMutationData,
  UpdateProjectMemberRoleMutationVariables,
} from "../types/api";
import type {
  CreateIssueInput,
  Issue,
  IssueLabel,
  IssueStatus,
  Project,
  ProjectMember,
  ProjectMemberRole,
} from "../types/models";

const mapApiIssueToIssue = (issue: ApiIssue): Issue => {
  return {
    id: issue.id,
    projectId: issue.projectId,
    title: issue.title,
    description: issue.description ?? "",
    status: issue.status,
    priority: issue.priority,
    labels: issue.labels.map((label) => ({
      name: label.name,
      color: label.color,
      description: label.description,
    })),
    assignee: issue.assignee ?? "Unassigned",
    assigneeId: issue.assigneeId,
    updatedAt: issue.updatedAt,
    comments: issue.comments.map((comment) => ({
      id: comment.id,
      userName: comment.userName,
      message: comment.message,
      timestamp: comment.createdAt,
    })),
  };
};

const mapApiMemberToMember = (member: ApiProjectMember): ProjectMember => {
  return {
    id: member.userId,
    userId: member.userId,
    projectId: member.projectId,
    name: member.name,
    role: member.role,
    email: member.email,
    status: member.status,
  };
};

const mapApiProjectToProject = (project: GetProjectQueryData["project"]): Project => {
  return {
    id: project.id,
    name: project.name,
    description: project.description ?? "",
    status: project.status,
    issueCount: project.issueCount ?? 0,
    progress: project.progress ?? 0,
    updatedAt: project.updatedAt,
  };
};

const ProjectDetailsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { projectId = "" } = useParams<{ projectId: string }>();
  const hasProjectId = Boolean(projectId);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeStatusFilter, setActiveStatusFilter] =
    React.useState<StatusFilterValue>(-1);
  const [activePriorityFilter, setActivePriorityFilter] =
    React.useState<PriorityFilterValue>(-1);
  const [isAddIssueOpen, setIsAddIssueOpen] = React.useState(false);
  const [isTeamDrawerOpen, setIsTeamDrawerOpen] = React.useState(false);
  const [selectedIssueId, setSelectedIssueId] = React.useState<string | null>(
    null,
  );

  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
    refetch: refetchProject,
  } = useQuery<GetProjectQueryData, GetProjectQueryVariables>(GET_PROJECT_QUERY, {
    variables: { id: projectId },
    skip: !hasProjectId,
    fetchPolicy: "network-only",
  });

  const {
    data: issuesData,
    loading: issuesLoading,
    error: issuesError,
    refetch: refetchIssues,
  } = useQuery<GetProjectIssuesQueryData, GetProjectIssuesQueryVariables>(
    GET_PROJECT_ISSUES_QUERY,
    {
      variables: { projectId },
      skip: !hasProjectId,
      fetchPolicy: "network-only",
    },
  );

  const { data: labelsData } = useQuery<GetLabelsQueryData>(GET_LABELS_QUERY, {
    skip: !hasProjectId,
    fetchPolicy: "cache-first",
  });

  const [createIssueMutation] = useMutation<
    CreateIssueMutationData,
    CreateIssueMutationVariables
  >(CREATE_ISSUE_MUTATION);
  const [updateIssueStatusMutation] = useMutation<
    UpdateIssueStatusMutationData,
    UpdateIssueStatusMutationVariables
  >(UPDATE_ISSUE_STATUS_MUTATION);
  const [deleteIssueMutation] = useMutation<
    DeleteIssueMutationData,
    DeleteIssueMutationVariables
  >(DELETE_ISSUE_MUTATION);
  const [createCommentMutation] = useMutation<
    CreateCommentMutationData,
    CreateCommentMutationVariables
  >(CREATE_COMMENT_MUTATION);
  const [addProjectMemberMutation] = useMutation<
    AddProjectMemberMutationData,
    AddProjectMemberMutationVariables
  >(ADD_PROJECT_MEMBER_MUTATION);
  const [updateProjectMemberRoleMutation] = useMutation<
    UpdateProjectMemberRoleMutationData,
    UpdateProjectMemberRoleMutationVariables
  >(UPDATE_PROJECT_MEMBER_ROLE_MUTATION);
  const [removeProjectMemberMutation] = useMutation<
    RemoveProjectMemberMutationData,
    RemoveProjectMemberMutationVariables
  >(REMOVE_PROJECT_MEMBER_MUTATION);

  const project = React.useMemo<Project | null>(() => {
    if (!projectData?.project) {
      return null;
    }

    return mapApiProjectToProject(projectData.project);
  }, [projectData]);

  const projectMembers = React.useMemo<ProjectMember[]>(() => {
    const members = projectData?.project?.members ?? [];

    return members
      .filter((member) => member.status === 0)
      .map((member) => mapApiMemberToMember(member));
  }, [projectData]);

  const currentUserProjectMember = React.useMemo(() => {
    if (!user) {
      return null;
    }

    return (
      projectMembers.find((member) => member.userId === user.id && member.status === 0) ??
      null
    );
  }, [projectMembers, user]);

  const isProjectAdmin = currentUserProjectMember?.role === 0;
  const canChangeIssueStatus = currentUserProjectMember
    ? currentUserProjectMember.role !== 2
    : false;

  const {
    data: availableUsersData,
    refetch: refetchAvailableUsers,
  } = useQuery<
    GetAvailableProjectUsersQueryData,
    GetAvailableProjectUsersQueryVariables
  >(GET_AVAILABLE_PROJECT_USERS_QUERY, {
    variables: {
      projectId,
    },
    skip: !hasProjectId || !isProjectAdmin,
    fetchPolicy: "network-only",
  });

  const availableUsers = React.useMemo<ApiMemberCandidate[]>(() => {
    return availableUsersData?.availableProjectUsers ?? [];
  }, [availableUsersData]);

  const assignableProjectMembers = React.useMemo<ProjectMember[]>(
    () => projectMembers.filter((member) => member.role === 1),
    [projectMembers],
  );

  const projectIssues = React.useMemo<Issue[]>(() => {
    const items = issuesData?.issues ?? [];
    return items.map((issue) => mapApiIssueToIssue(issue));
  }, [issuesData]);

  const selectedIssue = React.useMemo<Issue | null>(() => {
    if (!selectedIssueId) {
      return null;
    }

    return projectIssues.find((issue) => issue.id === selectedIssueId) ?? null;
  }, [projectIssues, selectedIssueId]);

  const canCommentSelectedIssue = React.useMemo(() => {
    if (!selectedIssue || !user) {
      return false;
    }

    if (selectedIssue.status === 2) {
      return false;
    }

    return isProjectAdmin || selectedIssue.assigneeId === user.id;
  }, [isProjectAdmin, selectedIssue, user]);

  const projectLabelOptions = React.useMemo(() => {
    const labelMap = new Map<string, IssueLabel>();

    (labelsData?.labels ?? []).forEach((label: ApiLabel) => {
      const key = label.name.trim().toLowerCase();

      if (!key || labelMap.has(key)) {
        return;
      }

      labelMap.set(key, {
        name: label.name,
        color: label.color,
        description: label.description,
      });
    });

    projectIssues.forEach((issue) => {
      issue.labels.forEach((label) => {
        const key = label.name.trim().toLowerCase();

        if (!key || labelMap.has(key)) {
          return;
        }

        labelMap.set(key, label);
      });
    });

    return Array.from(labelMap.values()).sort((left, right) =>
      left.name.localeCompare(right.name),
    );
  }, [labelsData, projectIssues]);

  const visibleIssues = React.useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return projectIssues.filter((issue) => {
      const matchesStatus =
        activeStatusFilter === -1 || issue.status === activeStatusFilter;
      const matchesPriority =
        activePriorityFilter === -1 || issue.priority === activePriorityFilter;
      const searchIndex = [
        issue.title,
        issue.description,
        issue.assignee,
        issue.labels.map((label) => `${label.name} ${label.description}`).join(" "),
        getIssueStatusLabel(issue.status),
        getIssuePriorityLabel(issue.priority),
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch =
        !normalizedSearch || searchIndex.includes(normalizedSearch);

      return matchesStatus && matchesPriority && matchesSearch;
    });
  }, [activePriorityFilter, activeStatusFilter, projectIssues, searchTerm]);

  const issueStats = React.useMemo(() => {
    return {
      total: projectIssues.length,
      todo: projectIssues.filter((issue) => issue.status === 0).length,
      inProgress: projectIssues.filter((issue) => issue.status === 1).length,
      closed: projectIssues.filter((issue) => issue.status === 2).length,
    };
  }, [projectIssues]);

  React.useEffect(() => {
    if (
      selectedIssueId &&
      !projectIssues.some((issue) => issue.id === selectedIssueId)
    ) {
      setSelectedIssueId(null);
    }
  }, [projectIssues, selectedIssueId]);

  React.useEffect(() => {
    setIsTeamDrawerOpen(false);
    setSelectedIssueId(null);
  }, [projectId]);

  const refreshProjectAndIssues = React.useCallback(async () => {
    await Promise.all([refetchProject(), refetchIssues()]);
  }, [refetchProject, refetchIssues]);

  const handleAddComment = React.useCallback(
    async (issueId: string, message: string) => {
      if (!user) {
        return;
      }

      const targetIssue = projectIssues.find((issue) => issue.id === issueId);
      if (!targetIssue || targetIssue.status === 2) {
        return;
      }

      const canComment =
        isProjectAdmin || targetIssue.assigneeId === user.id;

      if (!canComment) {
        return;
      }

      await createCommentMutation({
        variables: {
          issueId,
          message,
        },
      });

      await refetchIssues();
    },
    [createCommentMutation, isProjectAdmin, projectIssues, refetchIssues, user],
  );

  const handleIssueStatusChange = React.useCallback(
    async (issueId: string, status: IssueStatus) => {
      if (!canChangeIssueStatus) {
        return;
      }

      await updateIssueStatusMutation({
        variables: {
          id: issueId,
          status,
        },
      });

      await refetchIssues();
    },
    [canChangeIssueStatus, refetchIssues, updateIssueStatusMutation],
  );

  const handleIssueDelete = React.useCallback(
    async (issueId: string) => {
      await deleteIssueMutation({
        variables: {
          id: issueId,
        },
      });

      if (selectedIssueId === issueId) {
        setSelectedIssueId(null);
      }

      await refetchIssues();
    },
    [deleteIssueMutation, refetchIssues, selectedIssueId],
  );

  const handleCreateIssue = React.useCallback(
    async (input: CreateIssueInput) => {
      if (!hasProjectId) {
        return;
      }

      const assigneeMember = assignableProjectMembers.find(
        (member) =>
          member.name.trim().toLowerCase() ===
          input.assignee.trim().toLowerCase(),
      );

      await createIssueMutation({
        variables: {
          projectId,
          title: input.title,
          description: input.description,
          status: input.status,
          priority: input.priority,
          assigneeId: assigneeMember?.userId ?? null,
          labels: input.labels.map((label) => ({
            name: label.name,
            color: label.color,
            description: label.description,
          })),
        },
      });

      await refetchIssues();

      setActiveStatusFilter(-1);
      setActivePriorityFilter(-1);
      setSearchTerm("");
    },
    [
      createIssueMutation,
      assignableProjectMembers,
      hasProjectId,
      projectId,
      refetchIssues,
    ],
  );

  const handleAddMember = React.useCallback(
    async (userId: string, role: ProjectMemberRole) => {
      if (!hasProjectId) {
        return;
      }

      await addProjectMemberMutation({
        variables: {
          projectId,
          userId,
          role,
        },
      });

      await Promise.all([refetchProject(), refetchAvailableUsers()]);
    },
    [
      addProjectMemberMutation,
      hasProjectId,
      projectId,
      refetchAvailableUsers,
      refetchProject,
    ],
  );

  const handleRemoveMember = React.useCallback(
    async (memberId: string) => {
      if (!hasProjectId) {
        return;
      }

      await removeProjectMemberMutation({
        variables: {
          projectId,
          userId: memberId,
        },
      });

      await Promise.all([refreshProjectAndIssues(), refetchAvailableUsers()]);
    },
    [
      hasProjectId,
      projectId,
      refetchAvailableUsers,
      refreshProjectAndIssues,
      removeProjectMemberMutation,
    ],
  );

  const handleChangeMemberRole = React.useCallback(
    async (memberId: string, role: ProjectMemberRole) => {
      if (!hasProjectId) {
        return;
      }

      await updateProjectMemberRoleMutation({
        variables: {
          projectId,
          userId: memberId,
          role,
        },
      });

      await Promise.all([refetchProject(), refetchAvailableUsers()]);
    },
    [
      hasProjectId,
      projectId,
      refetchAvailableUsers,
      refetchProject,
      updateProjectMemberRoleMutation,
    ],
  );

  const hasNoIssues = projectIssues.length === 0;

  if (!hasProjectId) {
    return (
      <EmptyState
        title="Project not found"
        description="Project id is missing from route."
        actionLabel="Back to Projects"
        onAction={() => navigate("/projects")}
      />
    );
  }

  if (projectError || issuesError) {
    const description = projectError?.message ?? issuesError?.message ?? "Unknown error";

    return (
      <EmptyState
        title="Unable to load project"
        description={description}
        actionLabel="Retry"
        onAction={() => {
          void refreshProjectAndIssues();
        }}
      />
    );
  }

  if ((projectLoading || issuesLoading) && !project) {
    return (
      <EmptyState
        title="Loading project"
        description="Fetching project, issues, and members from server."
      />
    );
  }

  if (!project) {
    return (
      <EmptyState
        title="Project not found"
        description="The requested project may have been moved or deleted from this workspace."
        actionLabel="Back to Projects"
        onAction={() => navigate("/projects")}
      />
    );
  }

  const canCreateIssue = project.status === 0;

  return (
    <Stack spacing={2.4}>
      <PageHeader
        eyebrow="Project Details"
        title={project.name}
        description={project.description}
        actions={
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <Button
              variant="contained"
              onClick={() => setIsAddIssueOpen(true)}
              startIcon={<FiPlus size={15} />}
              disabled={!canCreateIssue}
            >
              Create Issue
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/projects")}
              startIcon={<FiArrowLeft size={15} />}
            >
              Back to Projects
            </Button>
          </Stack>
        }
      />

      <Box
        sx={{
          display: "grid",
          gap: 1.4,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
        }}
      >
        <StatCard
          label="Total Issues"
          value={issueStats.total}
          helperText="All tracked tickets"
        />
        <StatCard
          label="To Do"
          value={issueStats.todo}
          helperText="Ready for development"
          tone="warning"
        />
        <StatCard
          label="In Progress"
          value={issueStats.inProgress}
          helperText="Under active development"
        />
        <StatCard
          label="Closed"
          value={issueStats.closed}
          helperText="Resolved and shipped"
          tone="success"
        />
      </Box>

      <ProjectMemberList
        members={projectMembers}
        canManageTeam={isProjectAdmin}
        onManage={() => setIsTeamDrawerOpen(true)}
      />

      <GlassCard sx={{ p: 2, display: "grid", gap: 1.5 }}>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search issues by title, label, status, priority, description, or assignee"
        />
        <IssueFilters
          activeStatus={activeStatusFilter}
          activePriority={activePriorityFilter}
          onStatusChange={setActiveStatusFilter}
          onPriorityChange={setActivePriorityFilter}
        />
      </GlassCard>

      {visibleIssues.length === 0 ? (
        <EmptyState
          title={hasNoIssues ? "No issues yet" : "No issues for this filter"}
          description={
            hasNoIssues
              ? canCreateIssue
                ? "Create your first issue to start tracking work in this project."
                : "This project is closed or archived, so new issues cannot be created."
              : "Try selecting another status or clearing the search to inspect all project issues."
          }
          actionLabel={
            hasNoIssues
              ? canCreateIssue
                ? "Create Issue"
                : undefined
              : "Reset Filters"
          }
          onAction={() => {
            if (hasNoIssues) {
              if (!canCreateIssue) {
                return;
              }

              setIsAddIssueOpen(true);
              return;
            }

            setSearchTerm("");
            setActiveStatusFilter(-1);
            setActivePriorityFilter(-1);
          }}
        />
      ) : (
        <Stack spacing={1.4}>
          {visibleIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              canChangeStatus={canChangeIssueStatus}
              onSelect={(targetIssue) => setSelectedIssueId(targetIssue.id)}
              onStatusChange={(issueId, status) => {
                void handleIssueStatusChange(issueId, status);
              }}
              onDelete={(issueId) => {
                void handleIssueDelete(issueId);
              }}
            />
          ))}
        </Stack>
      )}

      <IssueDrawer
        open={Boolean(selectedIssueId)}
        issue={selectedIssue}
        canAddComment={canCommentSelectedIssue}
        onClose={() => setSelectedIssueId(null)}
        onAddComment={(issueId, message) => {
          void handleAddComment(issueId, message);
        }}
      />

      <AddIssueModal
        open={isAddIssueOpen}
        members={assignableProjectMembers}
        labelOptions={projectLabelOptions}
        onClose={() => setIsAddIssueOpen(false)}
        onCreate={(input) => {
          void handleCreateIssue(input);
        }}
      />

      <TeamDrawer
        open={isTeamDrawerOpen}
        projectName={project.name}
        members={projectMembers}
        availableUsers={availableUsers}
        canManageTeam={isProjectAdmin}
        onClose={() => setIsTeamDrawerOpen(false)}
        onAddMember={(userId, role) => {
          void handleAddMember(userId, role);
        }}
        onRemoveMember={(memberId) => {
          void handleRemoveMember(memberId);
        }}
        onChangeRole={(memberId, role) => {
          void handleChangeMemberRole(memberId, role);
        }}
      />
    </Stack>
  );
};

export default ProjectDetailsPage;
