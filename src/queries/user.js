import { gql } from '@apollo/client';

const REGISTER_USER = gql`
  mutation CreateUser(
    $fullname: String!
    $email: String!
    $password: String!
    $repeat_password: String!
  ) {
    createUser(
      userInput: {
        fullname: $fullname
        email: $email
        password: $password
        repeat_password: $repeat_password
      }
    ) {
      createdAt
      email
      fullname
      id
      token
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      createdAt
      email
      fullname
      id
      token
    }
  }
`;

export { REGISTER_USER, LOGIN_USER };
