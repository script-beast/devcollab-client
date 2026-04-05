import { gql } from "@apollo/client";

const projectMemberFields = gql`
  fragment ProjectMemberFields on ProjectMember {
    id
    projectId
    userId
    name
    email
    role
    status
    createdAt
    updatedAt
  }
`;

const memberCandidateFields = gql`
  fragment MemberCandidateFields on MemberCandidate {
    id
    name
    email
    avatar
  }
`;

export const GET_AVAILABLE_PROJECT_USERS_QUERY = gql`
  query GetAvailableProjectUsers($projectId: ID!, $search: String) {
    availableProjectUsers(projectId: $projectId, search: $search) {
      ...MemberCandidateFields
    }
  }
  ${memberCandidateFields}
`;

export const ADD_PROJECT_MEMBER_MUTATION = gql`
  mutation AddProjectMember($projectId: ID!, $userId: ID!, $role: Int!) {
    addProjectMember(projectId: $projectId, userId: $userId, role: $role) {
      ...ProjectMemberFields
    }
  }
  ${projectMemberFields}
`;

export const ADD_PROJECT_MEMBER_BY_NAME_MUTATION = gql`
  mutation AddProjectMemberByName(
    $projectId: ID!
    $name: String!
    $role: Int!
  ) {
    addProjectMemberByName(projectId: $projectId, name: $name, role: $role) {
      ...ProjectMemberFields
    }
  }
  ${projectMemberFields}
`;

export const UPDATE_PROJECT_MEMBER_ROLE_MUTATION = gql`
  mutation UpdateProjectMemberRole(
    $projectId: ID!
    $userId: ID!
    $role: Int!
  ) {
    updateProjectMemberRole(projectId: $projectId, userId: $userId, role: $role) {
      ...ProjectMemberFields
    }
  }
  ${projectMemberFields}
`;

export const REMOVE_PROJECT_MEMBER_MUTATION = gql`
  mutation RemoveProjectMember($projectId: ID!, $userId: ID!) {
    removeProjectMember(projectId: $projectId, userId: $userId)
  }
`;
