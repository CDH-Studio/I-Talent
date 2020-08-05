import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import timeout from "connect-timeout";
import cors from "cors";
import { keycloak, sessionInstance } from "./auth/keycloak";
import router from "./router/router";
import swaggerOptions from "./docs/swaggerOptions";

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
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

export default app;
