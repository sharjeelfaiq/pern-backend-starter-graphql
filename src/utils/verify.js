import createError from "http-errors";

export const verify = {
  accessToken: (resolver) => (parent, args, context, info) => {
    if (!context.user) throw createError(401, "Unauthorized");
    return resolver(parent, args, context, info);
  },

  authRole: (role) => (resolver) => (parent, args, context, info) => {
    if (!context.user) throw createError(401, "Unauthorized");
    if (context.user.role !== role) throw createError(403, "Forbidden");
    return resolver(parent, args, context, info);
  },
};
