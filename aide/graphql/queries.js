import { gql } from 'apollo-boost';

export const requestUser = gql`
    query Login($email: String!, $password: String!) {
        login (email: $email, password: $password) {
            email,
            password
        }
  }
`;


