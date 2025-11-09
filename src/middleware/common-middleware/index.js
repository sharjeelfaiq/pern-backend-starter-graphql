import cors from "cors";
import helmet from "helmet";
import express from "express";
import compression from "compression";
import { expressMiddleware } from "@as-integrations/express4";

import { logTheme } from "./colors.js";
import { corsOptions } from "./cors.js";
import { apiRateLimiter } from "./rate-limiter.js";
import { tokenUtils } from "#utils/token.utils.js";

export const setupMiddleware = (app, apolloServer) => {
  app.use(helmet());

  app.use(compression());

  app.use(
    "/graphql",
    cors(corsOptions),
    express.json(),
    apiRateLimiter,
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => {
        const authHeader = req.headers.authorization;
        let user = null;

        if (authHeader && authHeader.startsWith("Bearer ")) {
          const accessToken = authHeader.split(" ")[1];
          user = tokenUtils.verify(accessToken);
        }

        return { user, req, res };
      },
    }),
  );
};
