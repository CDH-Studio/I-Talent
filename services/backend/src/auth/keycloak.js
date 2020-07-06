const redis = require("redis");
const KeycloakConnect = require("keycloak-connect");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

let redisClient = redis.createClient({
  host: "redis",
  auth_pass: process.env.REDIS_PASSWORD,
});
const store = new RedisStore({ client: redisClient });

const keycloak = new KeycloakConnect(
  { store },
  {
    realm: "individual",
    "bearer-only": true,
    "auth-server-url": process.env.KEYCLOAK_AUTH_SERVER_URL,
    "ssl-required": "external",
    resource: "upskill-api",
    "confidential-port": 0,
  }
);

const sessionInstance = session({
  secret: process.env.KEYCLOAK_SECRET,
  resave: false,
  saveUninitialized: true,
  store,
});

module.exports = { keycloak, sessionInstance };
