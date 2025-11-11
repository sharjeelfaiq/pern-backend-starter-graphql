import createError from "http-errors";

import { tokenUtils, sendEmail } from "#utils/index.js";
import { repository } from "#repository/index.js";
import { env } from "#config/index.js";

const { read, update } = repository;
const { FRONTEND_URL } = env;

export const emailServices = {
  checkVerificationToken: async ({ verificationToken }) => {
    if (!verificationToken || typeof verificationToken !== "string")
      throw createError(400, "Verification token is required and must be a string.");

    const decodedToken = tokenUtils.verify(verificationToken);

    const { id } = decodedToken;

    if (!id) throw createError(400, "Token does not contain the user id");

    const isUserUpdated = await update.userById({ id, isEmailVerified: true });

    if (!isUserUpdated) throw createError(500, "Email verification failed.");

    if (!FRONTEND_URL) throw createError(500, "Frontend URL is not defined.");

    const sentEmail = await sendEmail("verification-notification", {
      FRONTEND_URL,
    });

    if (!sentEmail) throw createError(500, "Send the verification email failed.");

    return sentEmail;
  },

  sendVerificationToken: async ({ email }) => {
    const user = await read.userByEmail(email);

    if (!user) throw createError(404, "User not found.");

    const verificationToken = tokenUtils.generate({ id: user.id }, "verificationToken");

    if (!verificationToken) throw createError(500, "Verification token generation failed.");

    const sentEmail = await sendEmail("verification-email", {
      email,
      subject: "Welcome - Verify your email",
      verificationToken,
    });

    if (!sentEmail) throw createError(500, "Send welcome email failed.");

    return {
      status: "success",
      message: "Verification email sent successfully",
    };
  },
};
