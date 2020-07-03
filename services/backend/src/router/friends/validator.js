const { param } = require("express-validator");

const UUIDValidator = param("id").trim().isUUID().withMessage("must be a UUID");
module.exports = {
  UUIDValidator,
};
