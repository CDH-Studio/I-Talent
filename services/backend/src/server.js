const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const timeout = require("connect-timeout");
const { keycloak, sessionInstance } = require("./auth/keycloak");
const router = require("./router/router");
const swaggerOptions = require("./docs/swaggerOptions");

const app = express();

const port = process.env.PORT || 8080;

app.use(sessionInstance);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Authorization, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});
app.use(timeout("5s"));
app.use(keycloak.middleware());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", router);
app.get("/oauth2-redirect.html", function (req, res) {
  res.sendfile("src/docs/oauth2-redirect.html");
});
app.use("/api-docs", swaggerUi.serve, swaggerOptions);
app.use(keycloak.middleware({ logout: "/" }));

if (process.env.NODE_ENV !== "test")
  app.listen(port, () => console.log(`Backend port is ${port}.`));

module.exports = app;
