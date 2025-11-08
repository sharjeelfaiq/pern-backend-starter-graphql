import express from "express";

import { emailRoutes, otpRoutes, userRoutes } from "#modules/index.js";
import { validateMiddleware as validate } from "#middleware/index.js";

// Parent router
const appRouter = express.Router();

// Health routes
appRouter.get("/health", (_request, response) => {
  response.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// V1 router
const v1Router = express.Router();

appRouter.use("/api/v1", v1Router);

// V1 routes
v1Router.use("/email", emailRoutes);
v1Router.use("/otp", otpRoutes);
v1Router.use("/users", validate.accessToken, userRoutes);

export default appRouter;
