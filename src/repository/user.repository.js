import createError from "http-errors";
import { user } from "#models/index.js";
import { commonUtils } from "#utils/index.js";

const { validateUuid } = commonUtils;

export const userRepository = {
  read: {
    users: async () => {
      return await user.findMany();
    },

    userByEmail: async (email) => {
      return await user.findUnique({
        where: { email },
      });
    },

    userById: async (id) => {
      if (!validateUuid(id)) {
        throw createError(400, "Invalid user ID format.");
      }

      return await user.findUnique({
        where: { id },
      });
    },
  },

  write: {
    user: async (data) => {
      const { name, email, password, role } = data;

      return await user.create({
        data: { name, email, password, role },
      });
    },
  },

  update: {
    userById: async (uData) => {
      const { id, ...userData } = uData;

      if (!validateUuid(id)) {
        throw createError(400, "Invalid user ID format.");
      }

      if (Object.keys(userData).length === 0) {
        throw createError(400, "No data provided for update.");
      }

      const data = { ...userData };

      return await user.update({
        where: { id },
        data,
      });
    },
  },

  remove: {
    userById: async (id) => {
      if (!validateUuid(id)) {
        throw createError(400, "Invalid user ID format.");
      }

      return await user.delete({
        where: { id },
      });
    },
  },
};
