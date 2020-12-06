const { query } = require("express-validator");

const fuzzyValidator = [
  query("searchValue", "must provide searchValue").isString(),
];

module.exports = {
  fuzzyValidator,
};
