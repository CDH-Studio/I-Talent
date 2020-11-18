const { validationResult } = require("express-validator");

/**
 * Pretty prints the relevant information from an axios error
 */
const axiosErrorHandler = (error, _request, _response, next) => {
  if (error.response) {
    const { status, statusText, data, config, headers } = error.response;

    console.warn(status, statusText, data);
    console.warn("Config", config);
    console.warn("Headers", headers);
  }

  next(error);
};

const errorHandler = (error, request, response, next) => {
  console.log(error);

  if (error.errors) {
    response.status(422).json(error.errors);
  }

  if (error.code === "P2002") {
    response.sendStatus(409);
  }

  response.sendStatus(500);

  next(error);
};

const validationMiddlware = (request, response, next) => {
  validationResult(request).throw();
  next();
};

module.exports = {
  validationMiddlware,
  errorHandler,
  axiosErrorHandler,
};
