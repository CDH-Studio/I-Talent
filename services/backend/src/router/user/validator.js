const { body } = require("express-validator");

const createUserValidator = [
  body("name").isString().withMessage("must provide name"),
  body("firstName").isString().withMessage("must provide firstName"),
  body("lastName").isString().withMessage("must provide lastName"),
  body("email").isEmail().withMessage("must provide valid email"),
];

module.exports = {
  createUserValidator,
};
