import { commonUtils } from "#utils/index.js";
import { authServices } from "./auth.services.js";

const { asyncHandler } = commonUtils;

export const authResolvers = {
  Query: {
    _empty: () => "This is a placeholder",
  },
  Mutation: {
    signUp: asyncHandler(async (_parent, { input }) => authServices.signUp(input)),

    signIn: asyncHandler(async (_parent, { input }) => authServices.signIn(input)),

    signOut: asyncHandler(async (_parent, { accessToken }) =>
      authServices.signOut({ authorization: `Bearer ${accessToken}` }),
    ),

    requestPasswordReset: asyncHandler(async (_parent, { input }) =>
      authServices.requestPasswordReset(input),
    ),

    updatePassword: asyncHandler(async (_parent, { input }) => authServices.updatePassword(input)),
  },
};
