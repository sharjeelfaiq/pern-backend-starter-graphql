import { otp } from "#models/index.js";

export const otpRepository = {
  read: {
    otp: async (id) => {
      const records = await otp.findMany({
        where: { id },
        orderBy: { createdAt: "desc" },
        take: 1,
      });
      return records[0] || null;
    },
  },

  write: {
    otp: async (data) => {
      const { id, otpHash, expiresAt } = data;

      return await otp.create({
        data: {
          id,
          otpHash,
          expiresAt,
        },
      });
    },
  },
};
