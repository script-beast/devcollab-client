import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { FiPlus } from "react-icons/fi";
import { useMutation, useQuery } from "@apollo/client/react";
import { useNavigate } from "react-router";
import EmptyState from "../components/common/EmptyState";
import GlassCard from "../components/common/GlassCard";
import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import AddProjectModal from "../components/project/AddProjectModal";
import ProjectCard from "../components/project/ProjectCard";
import ProjectFilters, {
  type ProjectFilterValue,
} from "../components/project/ProjectFilters";
import { getProjectStatusLabel } from "../helper";
import {
  CREATE_PROJECT_MUTATION,
  GET_PROJECTS_QUERY,
  UPDATE_PROJECT_MUTATION,
} from "../graphql/project.graphql";
import type {
  CreateProjectMutationData,
  CreateProjectMutationVariables,
  GetProjectsQueryData,
  UpdateProjectMutationData,
  UpdateProjectMutationVariables,
} from "../types/api";
import type { CreateProjectInput, Project, ProjectStatus } from "../types/models";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState<ProjectFilterValue>(
    -1,
  );
  const [isAddProjectOpen, setIsAddProjectOpen] = React.useState(false);
  const { data, loading, error, refetch } = useQuery<GetProjectsQueryData>(
    GET_PROJECTS_QUERY,
    {
      fetchPolicy: "network-only",
    },
  );
  const [createProjectMutation, { loading: isCreatingProject }] = useMutation<
    CreateProjectMutationData,
    CreateProjectMutationVariables
  >(CREATE_PROJECT_MUTATION);
  const [updateProjectMutation] = useMutation<
    UpdateProjectMutationData,
    UpdateProjectMutationVariables
  >(UPDATE_PROJECT_MUTATION);

  const projects = React.useMemo<Project[]>(() => {
    const items = data?.projects?.data ?? [];

    return items.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description ?? "",
      status: project.status,
      currentUserRole: project.currentUserRole,
      issueCount: project.issueCount ?? 0,
      progress: project.progress ?? 0,
      updatedAt: project.updatedAt,
    }));
  }, [data]);

  const visibleProjects = React.useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesFilter =
        activeFilter === -1 || project.status === activeFilter;
      const searchIndex = [
        project.name,
        project.description,
        getProjectStatusLabel(project.status),
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch =
        !normalizedSearch || searchIndex.includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, projects, searchTerm]);

  const handleCreateProject = async (project: CreateProjectInput) => {
    await createProjectMutation({
      variables: {
        name: project.name,
        description: project.description,
      },
    });

    await refetch();
  };

  const openProject = (project: Project) => {
    navigate(`/projects/${project.id}`);
  };

  const handleProjectStatusChange = React.useCallback(
    async (projectId: string, status: ProjectStatus) => {
      await updateProjectMutation({
        variables: {
          id: projectId,
          status,
        },
      });

      await refetch();
    },
    [refetch, updateProjectMutation],
  );

  if (error) {
    return (
      <EmptyState
        title="Unable to load projects"
        description={error.message}
        actionLabel="Retry"
        onAction={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <Stack spacing={2.4}>
      <PageHeader
        eyebrow="Project Hub"
        title="Projects"
        description="Track active builds, unblock issues, and keep delivery momentum high across your engineering workspace."
        actions={
          <Button
            variant="contained"
            onClick={() => setIsAddProjectOpen(true)}
            startIcon={<FiPlus size={15} />}
            disabled={isCreatingProject}
          >
            Add Project
          </Button>
        }
      />

      <GlassCard sx={{ p: 2, display: "grid", gap: 1.5 }}>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search projects by name or description"
        />
        <ProjectFilters active={activeFilter} onChange={setActiveFilter} />
      </GlassCard>

      {loading && projects.length === 0 ? (
        <EmptyState
          title="Loading projects"
          description="Fetching your workspace projects from server."
        />
      ) : visibleProjects.length === 0 ? (
        <EmptyState
          title="No projects match your filters"
          description="Try another status or clear search text to discover projects in your workspace."
          actionLabel="Reset Filters"
          onAction={() => {
            setSearchTerm("");
            setActiveFilter(-1);
          }}
        />
      ) : (
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, minmax(0, 1fr))",
              xl: "repeat(3, minmax(0, 1fr))",
            },
          }}
        >
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              canChangeStatus={project.currentUserRole === 0}
              onOpen={openProject}
              onStatusChange={handleProjectStatusChange}
            />
          ))}
        </Box>
      )}

      {isAddProjectOpen ? (
        <AddProjectModal
          open={isAddProjectOpen}
          onClose={() => setIsAddProjectOpen(false)}
          onCreate={(project) => {
            void handleCreateProject(project);
          }}
        />
      ) : null}
    </Stack>
  );
};

export default DashboardPage;
