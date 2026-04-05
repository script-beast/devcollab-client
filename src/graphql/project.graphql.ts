import { gql } from "@apollo/client";

const projectFields = gql`
  fragment ProjectFields on Project {
    id
    name
    description
    status
    currentUserRole
    issueCount
    progress
    createdAt
    updatedAt
  }
`;

export const GET_PROJECTS_QUERY = gql`
  query GetProjects {
    projects {
      data {
        ...ProjectFields
      }
      total
    }
  }
  ${projectFields}
`;

export const GET_PROJECT_QUERY = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      ...ProjectFields
      members {
        id
        projectId
        userId
        name
        role
        status
      }
    }
  }
  ${projectFields}
`;

export const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProject($name: String!, $description: String) {
    createProject(name: $name, description: $description) {
      ...ProjectFields
    }
  }
  ${projectFields}
`;

export const UPDATE_PROJECT_MUTATION = gql`
  mutation UpdateProject(
    $id: ID!
    $name: String
    $description: String
    $status: Int
  ) {
    updateProject(id: $id, name: $name, description: $description, status: $status) {
      ...ProjectFields
    }
  }
  ${projectFields}
`;

export const DELETE_PROJECT_MUTATION = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`;
