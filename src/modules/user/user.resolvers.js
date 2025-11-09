import { commonUtils } from "#utils/index.js";
import { userServices } from "./user.services.js";

const { asyncHandler } = commonUtils;

export const userResolvers = {
  Query: {
    getUsers: asyncHandler(async (_parent, { input }) => userServices.getUsers(input)),

    getUserById: asyncHandler(async (_parent, { input }) => userServices.getUserById(input)),
  },

  Mutation: {
    updateUserById: asyncHandler(async (_parent, { input }) => userServices.updateUserById(input)),

    removeUserById: asyncHandler(async (_parent, { input }) => userServices.removeUserById(input)),
  },
};
