import { mergeTypeDefs } from "@graphql-tools/merge";

import { authTypeDefs } from "#modules/index.js";

export const typeDefs = mergeTypeDefs([authTypeDefs]);
