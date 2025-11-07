import { ApolloServer } from "@apollo/server";

import appRouter from "#routes/index.js";
import { setupMiddleware } from "#middleware/index.js";
import { logger, env } from "#config/index.js";

const { PORT, BACKEND_URL } = env;

export const createBackendServer = async (server, app) => {
  const apolloServer = new ApolloServer({
    typeDefs: `
      type Test {
        message: String
      }

      type Query {
        test: Test
        getUsers: Test
      }
    `,
    resolvers: {
      Query: {
        getUsers: () => {
          return { message: "Hello, World!" };
        },
      },
    },
  });

  await apolloServer.start();

  setupMiddleware(app, appRouter, apolloServer);

  server.listen(PORT || 5000, () => {
    logger.info(`[connected] Backend (url: ${BACKEND_URL})`.server);
  });
};
