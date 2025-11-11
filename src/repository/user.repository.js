import createError from "http-errors";
import { PrismaClient } from "@prisma/client";

import { commonUtils } from "#utils/index.js";

const { validateUuid } = commonUtils;
const prisma = new PrismaClient();

export const userRepository = {
  read: {
    users: async () => {
      return await prisma.user.findMany();
    },

    userByEmail: async (email) => {
      return await prisma.user.findUnique({
        where: { email },
      });
    },

    userById: async (id) => {
      if (!validateUuid(id)) {
        throw createError(400, "Invalid user ID format.");
      }

      return await prisma.user.findUnique({
        where: { id },
      });
    },
  },

  write: {
    user: async ({ firstName, lastName, email, password, role, isNewsletterSubscribed }) => {
      return await prisma.user.create({
        data: { firstName, lastName, email, password, role, isNewsletterSubscribed },
      });
    },
  },

  update: {
    userById: async ({ id, ...data }) => {
      if (!validateUuid(id)) {
        throw createError(400, "Invalid user ID format.");
      }

      if (Object.keys(data).length === 0) {
        throw createError(400, "No data provided for update.");
      }

      return await prisma.user.update({
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

      return await prisma.user.delete({
        where: { id },
      });
    },
  },
};
