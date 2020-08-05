import { param, body } from "express-validator";

const UUIDValidator = param("id").trim().isUUID().withMessage("must be a UUID");

const createUserValidator = [
  UUIDValidator,
  body("name").isString().withMessage("must provide name"),
  body("firstName").isString().withMessage("must provide firstName"),
  body("lastName").isString().withMessage("must provide lastName"),
  body("email").isEmail().withMessage("must provide valid email"),
];

export { createUserValidator, UUIDValidator };
