import { userServices } from "./user.services.js";
import { verify, commonUtils } from "#utils/index.js";

const { asyncHandler } = commonUtils;

export const userResolvers = {
  Query: {
    getUsers: asyncHandler(async (_parent, { input }) => userServices.getUsers(input)),

    getUserById: asyncHandler(async (_parent, { input }) => userServices.getUserById(input)),
  },

  Mutation: {
    updateUserById: asyncHandler(
      verify.accessToken(async (_parent, { input }) => userServices.updateUserById(input)),
    ),

    removeUserById: asyncHandler(
      verify.accessToken(async (_parent, { input }) => userServices.removeUserById(input)),
    ),
  },
};
