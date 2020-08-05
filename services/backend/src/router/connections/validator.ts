import { param } from "express-validator";

const UUIDValidator = param("id").trim().isUUID().withMessage("must be a UUID");

export { UUIDValidator };
