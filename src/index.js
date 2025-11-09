import express from "express";
import { ApolloServer } from "@apollo/server";

import { logger, env } from "#config/index.js";
import { setupMiddleware } from "#middleware/index.js";
import { typeDefs, resolvers } from "#graphql/index.js";

const { PORT, BACKEND_URL } = env;

const app = express();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

(async function main() {
  await apolloServer.start();

  setupMiddleware(app, apolloServer);

  app.listen(PORT || 5000, () => {
    logger.info(`[connected] Backend (url: ${BACKEND_URL})`.server);
  });
})();
