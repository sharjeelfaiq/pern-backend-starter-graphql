import { userRepository } from "./user.repository.js";
import { otpRepository } from "./otp.repository.js";

export const repository = {
  read: {
    ...userRepository.read,
    ...otpRepository.read,
  },

  write: {
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
