import { gql } from "@apollo/client";

const labelFields = gql`
  fragment LabelFields on Label {
    id
    name
    color
    description
    createdAt
    updatedAt
  }
`;

export const GET_LABELS_QUERY = gql`
  query GetLabels {
    labels {
      ...LabelFields
    }
  }
  ${labelFields}
`;

export const CREATE_LABEL_MUTATION = gql`
  mutation CreateLabel($name: String!, $color: String!, $description: String) {
    createLabel(name: $name, color: $color, description: $description) {
      ...LabelFields
    }
  }
  ${labelFields}
`;

export const UPDATE_LABEL_MUTATION = gql`
  mutation UpdateLabel(
    $id: ID!
    $name: String
    $color: String
    $description: String
  ) {
    updateLabel(id: $id, name: $name, color: $color, description: $description) {
      ...LabelFields
    }
  }
  ${labelFields}
`;

export const DELETE_LABEL_MUTATION = gql`
  mutation DeleteLabel($id: ID!) {
    deleteLabel(id: $id)
  }
`;
