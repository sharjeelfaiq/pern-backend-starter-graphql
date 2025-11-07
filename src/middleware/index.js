import { uploadMiddleware } from "./upload.middleware.js";
import { validateMiddleware } from "./validator.middleware.js";
import { setupMiddleware } from "./common-middleware/index.js";

export { setupMiddleware, uploadMiddleware, validateMiddleware };
