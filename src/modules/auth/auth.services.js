import createError from "http-errors";

import { tokenUtils, sendEmail, passwordUtils } from "#utils/index.js";
import { repository } from "#repository/index.js";
import { env } from "#config/index.js";

const { write, read, update, remove } = repository;
const { FRONTEND_URL } = env;

export const authServices = {
  signUp: async ({ name, email, password, role }) => {
    const existingEmail = await read.userByEmail(email);

    if (existingEmail) {
      throw createError(400, "A user with this email already exists.");
    }

    const hashedPassword = await passwordUtils.hash(password, { rounds: 12 });

    const registrationData = {
      name,
      email,
      password: hashedPassword,
      role,
    };

    const newUser = await write.user(registrationData);

    if (!newUser) {
      remove.user(newUser.id);

      throw createError(500, "Failed to create a new user.");
    }

    const verificationToken = tokenUtils.generate({ id: newUser.id }, "verificationToken");

    if (!verificationToken) {
      throw createError(500, "An error occurred while generating the token.");
    }

    if (!FRONTEND_URL) {
      throw createError(500, "FRONTEND_URL is not defined.");
    }

    const sentEmail = await sendEmail("verification-email", {
      email,
      subject: "Welcome - Verify your email",
      FRONTEND_URL,
      verificationToken,
    });

    if (!sentEmail) {
      throw createError(500, "Failed to send the welcome email.");
    }

    return {
      status: "success",
      message: "Signed up successfully. Please verify your email address.",
    };
  },

  signIn: async ({ email, password }) => {
    const user = await read.userByEmail(email);

    if (!user) {
      throw createError(401, "Invalid credentials.");
    }

    if (!user.isEmailVerified) {
      // Generate new verification token
      const verificationToken = tokenUtils.generate({ id: user.id }, "verificationToken");

      if (!verificationToken) {
        throw createError(500, "An error occurred while generating the token.");
      }

      // Send verification email
      const sentEmail = await sendEmail("verification-email", {
        email,
        subject: "Welcome - Please, verify your email",
        FRONTEND_URL,
        verificationToken,
      });

      if (!sentEmail) {
        throw createError(500, "Failed to send the verification email.");
      }

      // Then throw error informing the user
      throw createError(
        403,
        "Email not verified. A new verification link has been sent to your inbox.",
      );
    }

    const isPasswordValid = await passwordUtils.compare(password, user.password);

    if (!isPasswordValid) {
      throw createError(401, "Invalid credentials.");
    }

    const accessToken = tokenUtils.generate({ id: user.id, role: user.role }, "accessToken");

    if (!accessToken) {
      throw createError(500, "Token generation failed.");
    }

    return {
      status: "success",
      message: "Signed in successfully.",
      data: {
        id: user.id,
        role: user.role,
        accessToken,
      },
    };
  },

  requestPasswordReset: async ({ email }) => {
    const existingUser = await read.userByEmail(email);

    if (!existingUser) {
      throw createError(404, "User not found");
    }

    const resetToken = tokenUtils.generate({ id: existingUser.id }, "passwordResetToken");

    if (!resetToken) {
      throw createError(500, "Failed to generate reset token");
    }

    const sentEmail = await sendEmail("reset-password", {
      email,
      subject: "Reset your password",
      resetToken,
    });

    if (!sentEmail) {
      throw createError(500, "Failed to send reset password email");
    }

    return {
      status: "success",
      message: "Reset password email sent successfully.",
    };
  },

  updatePassword: async ({ password, resetToken }) => {
    const decodedToken = tokenUtils.verify(resetToken);

    const { id } = decodedToken;

    const existingUser = await read.userById(id);

    if (!existingUser) {
      throw createError(404, "User not found");
    }

    const hashedPassword = await passwordUtils.hash(password, { rounds: 12 });

    const isPasswordUpdated = await update.userById(id, {
      password: hashedPassword,
    });

    if (!isPasswordUpdated) {
      throw createError(500, "Password update failed");
    }

    return {
      status: "success",
      message: "Password updated successfully.",
    };
  },
};
