const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const timeout = require("connect-timeout");
const cors = require("cors");
const morgan = require("morgan");
require("express-async-errors");

const { keycloak, sessionInstance } = require("./auth/keycloak");
const router = require("./router/router");
const swaggerOptions = require("./docs/swaggerOptions");
const config = require("./config");
const { errorHandler } = require("./utils/middleware");

const app = express();

if (config.ENV !== "test") {
  app.use(morgan(config.MORGAN_CONFIG));
}

if (config.ENV === "development") {
  app.get("/oauth2-redirect.html", (req, res) => {
    res.sendFile(`${__dirname}/docs/oauth2-redirect.html`);
  });
  app.use("/api-docs", swaggerUi.serve, swaggerOptions);
}

app.use(cors());
app.use(helmet());
app.use(sessionInstance);
app.use(timeout("5s"));
app.use(keycloak.middleware());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.disable("x-powered-by");

app.use("/api", router);
app.use(keycloak.middleware({ logout: "/" }), errorHandler);

if (config.ENV !== "test") {
  app.listen(config.PORT, () => console.log(`Backend port is ${config.PORT}.`));
}

module.exports = app;
