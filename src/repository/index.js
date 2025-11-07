import { blacklistedTokenRepository } from "./blacklisted-token.repository.js";
import { userRepository } from "./user.repository.js";
import { otpRepository } from "./otp.repository.js";

export const repository = {
  read: {
    ...blacklistedTokenRepository.read,
    ...userRepository.read,
    ...otpRepository.read,
  },

  write: {
    ...blacklistedTokenRepository.write,
    ...userRepository.write,
    ...otpRepository.write,
  },

  update: {
    ...userRepository.update,
  },

  remove: {
    ...userRepository.remove,
  },
};
