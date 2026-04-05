import { gql } from "@apollo/client";

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($issueId: ID!, $message: String!) {
    createComment(issueId: $issueId, message: $message) {
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
