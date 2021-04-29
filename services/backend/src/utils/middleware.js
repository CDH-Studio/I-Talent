const { validationResult } = require("express-validator");

/**
 * Pretty prints the relevant information from an axios error or other error
 */
const printError = (error) => {
  if (error.isAxiosError && error.response) {
    const { status, statusText, data, config, headers } = error.response;

    console.log(status, statusText, data);
    console.log("Config", config);
    console.log("Headers", headers);
  } else {
    console.log(error);
  }
};

const errorHandler = (error, _request, response, next) => {
  printError(error);

  if (error.errors) {
    response.status(422).json(error.errors);
  } else if (error.code === "P2002") {
    response.sendStatus(409);
  } else {
    response.sendStatus(500);
  }

  next(error);
};

const validationMiddlware = (request, _response, next) => {
  validationResult(request).throw();
  next();
};

module.exports = {
  validationMiddlware,
  errorHandler,
};
