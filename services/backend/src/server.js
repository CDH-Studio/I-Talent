const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { keycloak, sessionInstance } = require("./auth/keycloak");
const router = require("./router/router");

const app = express();

const port = process.env.PORT || 8080;

dotenv.config();

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

app.use(keycloak.middleware());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", router);
app.use(keycloak.middleware({ logout: "/" }));
app.listen(port, () => console.log(`Magic happens on port ${port}`));
