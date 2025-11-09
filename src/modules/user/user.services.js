import createError from "http-errors";

import { repository } from "#repository/index.js";

const { read, update, remove } = repository;

export const userServices = {
  getUsers: async () => {
    const users = await read.users();

    return {
      status: "success",
      message: "Users retrieved successfully",
      data: users,
    };
  },

  getUserById: async ({ id }) => {
    const user = await read.userById(id);

    if (!user) {
      throw createError(404, "User not found");
    }

    return {
      status: "success",
      message: "User retrieved successfully",
      data: user,
    };
  },

  updateUserById: async ({ id, name, email, password, role }) => {
    const existingUser = await read.userById(id);

    if (!existingUser) {
      throw createError(404, "User not found");
    }

    const data = {
      ...(name && { name }),
      ...(email && { email }),
      ...(role && { role }),
      ...(password && { password: await passwordUtils.hash(password, { rounds: 12 }) }),
    };

    const updatedUser = await update.userById(id, data);

    if (!updatedUser) {
      throw createError(500, "User update failed");
    }

    return {
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    };
  },

  removeUserById: async ({ id }) => {
    const user = await remove.userById(id);

    if (!user) {
      throw createError(404, "User not found");
    }

    return {
      status: "success",
      message: "User deleted successfully",
    };
  },
};
