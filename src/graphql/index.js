import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

import {
  authTypeDefs,
  authResolvers,
  emailTypeDefs,
  emailResolvers,
  userTypeDefs,
  userResolvers,
  otpTypeDefs,
  otpResolvers,
} from "#modules/index.js";

export const typeDefs = mergeTypeDefs([authTypeDefs, emailTypeDefs, otpTypeDefs, userTypeDefs]);
export const resolvers = mergeResolvers([
  authResolvers,
  emailResolvers,
  otpResolvers,
  userResolvers,
]);
