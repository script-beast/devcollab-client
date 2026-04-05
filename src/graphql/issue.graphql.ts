import { gql } from "@apollo/client";

const issueFields = gql`
  fragment IssueFields on Issue {
    id
    projectId
    title
    description
    status
    priority
    assignee
    assigneeId
    inprogressDate
    closedDate
    createdAt
    updatedAt
    labels {
      id
      name
      color
      description
      createdAt
      updatedAt
    }
    comments {
      id
      issueId
      message
      userName
      createdAt
      updatedAt
      createdBy {
        id
        name
        email
        avatar
      }
    }
  }
`;

export const GET_PROJECT_ISSUES_QUERY = gql`
  query GetProjectIssues($projectId: ID!) {
    issues(projectId: $projectId) {
      ...IssueFields
    }
  }
  ${issueFields}
`;

export const GET_WORKSPACE_ISSUES_QUERY = gql`
  query GetWorkspaceIssues {
    workspaceIssues {
      ...IssueFields
    }
  }
  ${issueFields}
`;

export const CREATE_ISSUE_MUTATION = gql`
  mutation CreateIssue(
    $projectId: ID!
    $title: String!
    $description: String
    $status: Int
    $priority: Int
    $assigneeId: ID
    $labels: [IssueLabelInput!]
  ) {
    createIssue(
      projectId: $projectId
      title: $title
      description: $description
      status: $status
      priority: $priority
      assigneeId: $assigneeId
      labels: $labels
    ) {
      ...IssueFields
    }
  }
  ${issueFields}
`;

export const UPDATE_ISSUE_MUTATION = gql`
  mutation UpdateIssue(
    $id: ID!
    $title: String
    $description: String
    $status: Int
    $priority: Int
    $assigneeId: ID
    $labels: [IssueLabelInput!]
  ) {
    updateIssue(
      id: $id
      title: $title
      description: $description
      status: $status
      priority: $priority
      assigneeId: $assigneeId
      labels: $labels
    ) {
      ...IssueFields
    }
  }
  ${issueFields}
`;

export const UPDATE_ISSUE_STATUS_MUTATION = gql`
  mutation UpdateIssueStatus($id: ID!, $status: Int!) {
    updateIssueStatus(id: $id, status: $status) {
      ...IssueFields
    }
  }
  ${issueFields}
`;

export const DELETE_ISSUE_MUTATION = gql`
  mutation DeleteIssue($id: ID!) {
    deleteIssue(id: $id)
  }
`;
