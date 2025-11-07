import { blacklistedToken } from "#models/index.js";

export const blacklistedTokenRepository = {
  write: {
    blacklistedToken: async (data) => {
      const { token, userId, expiresAt } = data;

      return await blacklistedToken.create({
        data: {
          token,
          userId,
          expiresAt,
        },
      });
    },
  },
};
