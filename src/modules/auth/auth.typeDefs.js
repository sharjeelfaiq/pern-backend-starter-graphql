import { gql } from "graphql-tag";

export const authTypeDefs = gql`
  enum Role {
    user
    admin
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    isEmailVerified: Boolean!
  }

  type AuthPayload {
    status: String!
    message: String!
    data: UserToken
  }

  type UserToken {
    id: ID!
    role: Role!
    accessToken: String!
  }

  type GenericResponse {
    status: String!
    message: String!
  }

  input SignUpInput {
    name: String!
    email: String!
    password: String!
    role: Role!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  input PasswordResetRequestInput {
    email: String!
  }

  input PasswordUpdateInput {
    password: String!
    resetToken: String!
  }

  type Query {
    _empty: String
  }

  type Mutation {
    signUp(input: SignUpInput!): GenericResponse!
    signIn(input: SignInInput!): AuthPayload!
    signOut(accessToken: String!): GenericResponse!
    requestPasswordReset(input: PasswordResetRequestInput!): GenericResponse!
    updatePassword(input: PasswordUpdateInput!): GenericResponse!
  }
`;
