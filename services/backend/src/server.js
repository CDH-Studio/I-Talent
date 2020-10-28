const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const timeout = require("connect-timeout");
const cors = require("cors");
const morgan = require("morgan");

const { keycloak, sessionInstance } = require("./auth/keycloak");
const router = require("./router/router");
const swaggerOptions = require("./docs/swaggerOptions");
const config = require("./config");

const app = express();

app.set("trust proxy", true);
app.use([
  cors(),
  helmet(),
  sessionInstance,
  timeout("5s"),
  keycloak.middleware(),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  morgan(config.ENV === "development" ? "dev" : "combined"),
]);
app.use("/api", router);
app.get("/oauth2-redirect.html", function (req, res) {
  res.sendfile("src/docs/oauth2-redirect.html");
});
app.use("/api-docs", swaggerUi.serve, swaggerOptions);
app.use(keycloak.middleware({ logout: "/" }));

if (config.ENV !== "test")
  app.listen(config.PORT, () => console.log(`Backend port is ${config.PORT}.`));

module.exports = app;
