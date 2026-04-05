import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { FiPlus } from "react-icons/fi";
import { useMutation, useQuery } from "@apollo/client/react";
import EmptyState from "../components/common/EmptyState";
import GlassCard from "../components/common/GlassCard";
import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import StatCard from "../components/common/StatCard";
import LabelCard from "../components/label/LabelCard";
import LabelFormModal from "../components/label/LabelFormModal";
import { GET_WORKSPACE_ISSUES_QUERY } from "../graphql/issue.graphql";
import {
  CREATE_LABEL_MUTATION,
  DELETE_LABEL_MUTATION,
  GET_LABELS_QUERY,
  UPDATE_LABEL_MUTATION,
} from "../graphql/label.graphql";
import type {
  CreateLabelMutationData,
  CreateLabelMutationVariables,
  DeleteLabelMutationData,
  DeleteLabelMutationVariables,
  GetLabelsQueryData,
  GetWorkspaceIssuesQueryData,
  UpdateLabelMutationData,
  UpdateLabelMutationVariables,
} from "../types/api";
import type { CreateLabelInput, Label } from "../types/models";

const normalizeText = (value: string) => value.trim().toLowerCase();

const LabelsPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [editingLabel, setEditingLabel] = React.useState<Label | null>(null);

  const {
    data: labelsData,
    loading: labelsLoading,
    error: labelsError,
    refetch: refetchLabels,
  } = useQuery<GetLabelsQueryData>(GET_LABELS_QUERY, {
    fetchPolicy: "network-only",
  });

  const {
    data: workspaceIssuesData,
    error: workspaceIssuesError,
    refetch: refetchWorkspaceIssues,
  } = useQuery<GetWorkspaceIssuesQueryData>(GET_WORKSPACE_ISSUES_QUERY, {
    fetchPolicy: "network-only",
  });

  const [createLabelMutation] = useMutation<
    CreateLabelMutationData,
    CreateLabelMutationVariables
  >(CREATE_LABEL_MUTATION);
  const [updateLabelMutation] = useMutation<
    UpdateLabelMutationData,
    UpdateLabelMutationVariables
  >(UPDATE_LABEL_MUTATION);
  const [deleteLabelMutation] = useMutation<
    DeleteLabelMutationData,
    DeleteLabelMutationVariables
  >(DELETE_LABEL_MUTATION);

  const labels = React.useMemo<Label[]>(() => {
    const items = labelsData?.labels ?? [];

    return items.map((label) => ({
      id: label.id,
      name: label.name,
      color: label.color,
      description: label.description,
      createdAt: label.createdAt,
    }));
  }, [labelsData]);

  const usageCountByLabel = React.useMemo(() => {
    const issues = workspaceIssuesData?.workspaceIssues ?? [];

    return issues.reduce<Record<string, number>>((counts, issue) => {
      issue.labels.forEach((label) => {
        const key = normalizeText(label.name);
        counts[key] = (counts[key] ?? 0) + 1;
      });

      return counts;
    }, {});
  }, [workspaceIssuesData]);

  const sortedLabels = React.useMemo(() => {
    return [...labels].sort((left, right) => left.name.localeCompare(right.name));
  }, [labels]);

  const visibleLabels = React.useMemo(() => {
    const normalizedSearch = normalizeText(searchTerm);

    return sortedLabels.filter((label) => {
      if (!normalizedSearch) {
        return true;
      }

      const searchIndex = [label.name, label.description, label.color].join(" ").toLowerCase();
      return searchIndex.includes(normalizedSearch);
    });
  }, [searchTerm, sortedLabels]);

  const labelsInUse = React.useMemo(() => {
    return labels.filter((label) => (usageCountByLabel[normalizeText(label.name)] ?? 0) > 0).length;
  }, [labels, usageCountByLabel]);

  const createLabel = React.useCallback(
    async (input: CreateLabelInput) => {
      await createLabelMutation({
        variables: {
          name: input.name,
          color: input.color,
          description: input.description,
        },
      });

      await Promise.all([refetchLabels(), refetchWorkspaceIssues()]);
      setIsCreateOpen(false);
    },
    [createLabelMutation, refetchLabels, refetchWorkspaceIssues],
  );

  const updateLabel = React.useCallback(
    async (input: CreateLabelInput) => {
      if (!editingLabel) {
        return;
      }

      await updateLabelMutation({
        variables: {
          id: editingLabel.id,
          name: input.name,
          color: input.color,
          description: input.description,
        },
      });

      await Promise.all([refetchLabels(), refetchWorkspaceIssues()]);
      setEditingLabel(null);
    },
    [editingLabel, refetchLabels, refetchWorkspaceIssues, updateLabelMutation],
  );

  const deleteLabel = React.useCallback(
    async (target: Label) => {
      const shouldDelete = window.confirm(`Delete label "${target.name}"?`);

      if (!shouldDelete) {
        return;
      }

      await deleteLabelMutation({
        variables: {
          id: target.id,
        },
      });

      await Promise.all([refetchLabels(), refetchWorkspaceIssues()]);

      setEditingLabel((currentLabel) => {
        if (!currentLabel || currentLabel.id !== target.id) {
          return currentLabel;
        }

        return null;
      });
    },
    [deleteLabelMutation, refetchLabels, refetchWorkspaceIssues],
  );

  if (labelsError || workspaceIssuesError) {
    return (
      <EmptyState
        title="Unable to load labels"
        description={labelsError?.message ?? workspaceIssuesError?.message ?? "Unknown error"}
        actionLabel="Retry"
        onAction={() => {
          void Promise.all([refetchLabels(), refetchWorkspaceIssues()]);
        }}
      />
    );
  }

  const hasNoLabels = labels.length === 0;
  const existingNames = labels.map((label) => label.name);

  return (
    <Stack spacing={2.4}>
      <PageHeader
        eyebrow="Taxonomy"
        title="Labels"
        description="Create, edit, and remove labels used across your workspace issues."
        actions={
          <Button variant="contained" startIcon={<FiPlus size={15} />} onClick={() => setIsCreateOpen(true)}>
            Add Label
          </Button>
        }
      />

      <Box
        sx={{
          display: "grid",
          gap: 1.2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
        }}
      >
        <StatCard label="Total Labels" value={labels.length} helperText="Custom taxonomy entries" />
        <StatCard label="In Use" value={labelsInUse} helperText="Referenced by issue data" tone="success" />
        <StatCard
          label="Unused"
          value={Math.max(labels.length - labelsInUse, 0)}
          helperText="Safe candidates for cleanup"
          tone="warning"
        />
      </Box>

      <GlassCard sx={{ p: 2 }}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search labels by name, description, or color" />
      </GlassCard>

      {labelsLoading && labels.length === 0 ? (
        <EmptyState
          title="Loading labels"
          description="Fetching labels and usage from server."
        />
      ) : visibleLabels.length === 0 ? (
        <EmptyState
          title={hasNoLabels ? "No labels yet" : "No labels match your search"}
          description={
            hasNoLabels
              ? "Create your first label to define issue classification in this workspace."
              : "Try another keyword or clear the search text."
          }
          actionLabel={hasNoLabels ? "Add Label" : "Clear Search"}
          onAction={() => {
            if (hasNoLabels) {
              setIsCreateOpen(true);
              return;
            }

            setSearchTerm("");
          }}
        />
      ) : (
        <Box
          sx={{
            display: "grid",
            gap: 1.2,
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, minmax(0, 1fr))",
              xl: "repeat(3, minmax(0, 1fr))",
            },
          }}
        >
          {visibleLabels.map((label) => (
            <LabelCard
              key={label.id}
              label={label}
              usageCount={usageCountByLabel[normalizeText(label.name)] ?? 0}
              onEdit={setEditingLabel}
              onDelete={deleteLabel}
            />
          ))}
        </Box>
      )}

      <LabelFormModal
        open={isCreateOpen}
        mode="create"
        existingNames={existingNames}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={(input) => {
          void createLabel(input);
        }}
      />

      <LabelFormModal
        open={Boolean(editingLabel)}
        mode="edit"
        initialValue={editingLabel}
        existingNames={existingNames}
        onClose={() => setEditingLabel(null)}
        onSubmit={(input) => {
          void updateLabel(input);
        }}
      />
    </Stack>
  );
};

export default LabelsPage;
