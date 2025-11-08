import { gql } from "graphql-tag";

export const emailTypeDefs = gql`
  type GenericResponse {
    status: String!
    message: String!
  }

  type Query {
    _empty: String
  }

  type Mutation {
    checkVerificationToken(verificationToken: String!): GenericResponse!
    sendVerificationToken(email: String!): GenericResponse!
  }
`;
