import { ApolloServer } from "@apollo/server";

import { logger, env } from "#config/index.js";
import { setupMiddleware } from "#middleware/index.js";
import { typeDefs, resolvers } from "#graphql/index.js";

const { PORT, BACKEND_URL } = env;

export const createBackendServer = async (server, app) => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  setupMiddleware(app, apolloServer);

  server.listen(PORT || 5000, () => {
    logger.info(`[connected] Backend (url: ${BACKEND_URL})`.server);
  });
};
