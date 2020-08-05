import * as redis from "redis";
import KeycloakConnect from "keycloak-connect";
import session from "express-session";
import RedisStore from "connect-redis";

let redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  auth_pass: process.env.REDIS_PASSWORD,
});
const store = new (RedisStore(session))({ client: redisClient });

const keycloak = new KeycloakConnect(
  { store },
  {
    realm: "individual",
    "bearer-only": true,
    "auth-server-url": process.env.KEYCLOAK_AUTH_SERVER_URL,
    "ssl-required": "external",
    resource: process.env.KEYCLOAK_CLIENT_ID,
    "confidential-port": 0,
  }
);

const sessionInstance = session({
  secret: process.env.KEYCLOAK_SECRET,
  resave: false,
  saveUninitialized: true,
  store,
});

export { keycloak, sessionInstance };
