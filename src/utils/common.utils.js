import createError from "http-errors";

export const commonUtils = {
  // 🟡 For Express middleware or route handlers
  routesAsyncHandler: (fn) => async (request, response, next) => {
    try {
      return await fn(request, response, next);
    } catch (error) {
      next(error);
    }
  },

  // 🔵 For general top-level async functions
  asyncHandler:
    (fn) =>
    async (...args) => {
      try {
        return await fn(...args);
      } catch (error) {
        throw createError(500, error.message);
      }
    },

  validateUuid: (id) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  },
};
