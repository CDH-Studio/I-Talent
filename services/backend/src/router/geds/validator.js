const { query } = require("express-validator");

const profileGenValidator = [
  query("email", "must provide valid email").isEmail(),
];

module.exports = {
  profileGenValidator,
};
