import express from "express";

import { uploadMiddleware, validateMiddleware as validate } from "#middleware/index.js";
import { userControllers } from "./user.controllers.js";

export const userRoutes = express.Router();

userRoutes
  .get("/", userControllers.getUsers)
  .get("/:id", userControllers.getById)
  .patch("/:id", uploadMiddleware, userControllers.updateById)
  .delete("/:id", validate.authRole("admin"), userControllers.deleteById);
