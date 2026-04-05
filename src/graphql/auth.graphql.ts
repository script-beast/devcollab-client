import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        avatar
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
      user {
        id
        name
        email
        avatar
      }
    }
  }
`;

export const GET_PROFILE_QUERY = gql`
  query GetProfile {
    me {
      id
      name
      email
      avatar
    }
  }
`;
