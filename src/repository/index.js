import { categoryRepository } from "./category.repository.js";
import { userRepository } from "./user.repository.js";
import { otpRepository } from "./otp.repository.js";

export const repository = {
  read: {
    ...categoryRepository.read,
    ...otpRepository.read,
    ...userRepository.read,
  },

  write: {
    ...categoryRepository.write,
    ...otpRepository.write,
    ...userRepository.write,
  },

  update: {
    ...categoryRepository.update,
    ...userRepository.update,
  },

  remove: {
    ...categoryRepository.remove,
    ...userRepository.remove,
  },
};
