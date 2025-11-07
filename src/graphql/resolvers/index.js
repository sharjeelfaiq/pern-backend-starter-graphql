import { mergeResolvers } from "@graphql-tools/merge";

import { authResolvers } from "#modules/index.js";

export const resolvers = mergeResolvers([authResolvers]);
