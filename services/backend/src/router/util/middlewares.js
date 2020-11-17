const { validationResult } = require("express-validator");

function errorHandlingMiddlware(error, request, response, _next) {
  console.log(error);
  if (error.errors) {
    response.status(422).json(error.errors);
    return;
  }

  if (error.code === "P2002") {
    response.status(409).send();
    return;
  }

  response.status(500).send();
}

function validationMiddlware(request, response, next) {
  validationResult(request).throw();
  next();
}

module.exports = { validationMiddlware, errorHandlingMiddlware };
