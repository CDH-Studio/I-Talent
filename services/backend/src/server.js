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
const { errorHandlingMiddlware } = require("./router/util/middlewares");

const app = express();

app.set("trust proxy", true);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Authorization, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

if (config.ENV !== "test") {
  app.use(morgan(config.MORGAN_CONFIG));
}

if (config.ENV === "development") {
  app.get("/oauth2-redirect.html", function (req, res) {
    res.sendFile(`${__dirname}/docs/oauth2-redirect.html`);
  });
  app.use("/api-docs", swaggerUi.serve, swaggerOptions);
}

app.use(
  cors(),
  helmet(),
  sessionInstance,
  timeout("5s"),
  keycloak.middleware(),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json()
);
app.use("/api", router);
app.use(keycloak.middleware({ logout: "/" }), errorHandlingMiddlware);

if (config.ENV !== "test") {
  app.listen(config.PORT, () => console.log(`Backend port is ${config.PORT}.`));
}

module.exports = app;
