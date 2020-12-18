const { validationResult } = require("express-validator");
const { isKeycloakUser } = require("./keycloak");

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

/**
 * Throws validation error, if validation does not pass
 */
const validationMiddlware = (request, _response, next) => {
  validationResult(request).throw();
  next();
};

/**
 * Stops the request if the user requesting the endpoint is the same
 * user making the request (checks userId param in the router checkpoint)
 */
const sameUserMiddleware = (request, response, next) => {
  const { userId } = request.params;

  if (!isKeycloakUser(request, userId)) {
    response.sendStatus(403);
  } else {
    next();
  }
};

module.exports = {
  validationMiddlware,
  errorHandler,
  sameUserMiddleware,
};
