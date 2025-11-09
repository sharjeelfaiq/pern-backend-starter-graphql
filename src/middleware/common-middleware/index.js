import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import morgan from "morgan";
import express from "express";
import compression from "compression";
import { expressMiddleware } from "@as-integrations/express4";

import { logTheme } from "./colors.js";
import { corsOptions } from "./cors.js";
import { apiRateLimiter } from "./rate-limiter.js";

export const setupMiddleware = (app, apolloServer) => {
  app.use(morgan("common")); // Log HTTP requests ✅ Always keep

  app.use(helmet()); // Set secure HTTP headers ✅ Always keep

  app.use(apiRateLimiter); // Apply rate limiting ⚠️ Only for public APIs

  app.use(xss()); // Prevent XSS attacks ⚠️ Only if rendering HTML with user input

  app.use(cors(corsOptions)); // Enable CORS ✅ Always keep

  app.use(express.json({ limit: "10mb" })); // Parse JSON requests ✅ Always keep

  app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Parse URL-encoded requests ✅ Always keep

  app.use(compression()); // Compress responses ✅ Always keep

  app.use("/graphql", expressMiddleware(apolloServer)); // GraphQL endpoint ✅ Always keep
};
