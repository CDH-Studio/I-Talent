import { query } from "express-validator";

const langValidator = [
  query("language")
    .trim()
    .isIn(["ENGLISH", "FRENCH"])
    .withMessage("must be 'ENGLISH' or 'FRENCH'"),
];

export { langValidator };
