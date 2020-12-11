const { body } = require("express-validator");

const createUserValidator = [
  body("name", "must provide name").isString(),
  body("firstName", "must provide firstName").isString(),
  body("lastName", "must provide lastName").isString(),
  body("email", "must provide valid email").isEmail(),
];

module.exports = {
  createUserValidator,
};
