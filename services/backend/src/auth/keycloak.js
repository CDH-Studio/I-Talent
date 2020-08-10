const redis = require("redis");
const KeycloakConnect = require("keycloak-connect");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const config = require("../config");

let redisClient = redis.createClient({
  host: config.REDIS_HOST,
  auth_pass: config.REDIS_PASSWORD,
});
const store = new RedisStore({ client: redisClient });

const keycloak = new KeycloakConnect(
  { store },
  {
    realm: "individual",
    "bearer-only": true,
    "auth-server-url": config.KEYCLOAK_AUTH_SERVER_URL,
    "ssl-required": "external",
    resource: config.KEYCLOAK_CLIENT_ID,
    "confidential-port": 0,
  }
);

const sessionInstance = session({
  secret: config.KEYCLOAK_SECRET,
  resave: false,
  saveUninitialized: true,
  store,
});

module.exports = { keycloak, sessionInstance };
