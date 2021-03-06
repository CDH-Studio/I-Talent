const {
  NODE_ENV,
  PORT,
  DATABASE_URL,
  KEYCLOAK_SECRET,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_AUTH_SERVER_URL,
  DOCS_KEYCLOAK_CLIENT_ID,
  DOCS_KEYCLOAK_AUTH_URL,
  DOCS_KEYCLOAK_TOKEN_URL,
  GEDSAPIURL,
  GEDSAPIKEY,
  REDIS_HOST,
  REDIS_PASSWORD,
  COOKIE_DOMAIN,
  COOKIE_PATH,
  SESSION_NAME,
} = process.env;

const production = {
  ENV: "production",
  PORT,
  DATABASE_URL,
  KEYCLOAK_SECRET,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_AUTH_SERVER_URL,
  DOCS_KEYCLOAK_CLIENT_ID: "",
  DOCS_KEYCLOAK_AUTH_URL: "",
  DOCS_KEYCLOAK_TOKEN_URL: "",
  GEDSAPIURL,
  GEDSAPIKEY,
  REDIS_HOST,
  REDIS_PASSWORD,
  COOKIE_DOMAIN,
  COOKIE_PATH,
  SESSION_NAME,
  MORGAN_CONFIG: "combined",
};

const test = {
  ENV: "test",
  PORT: "",
  DATABASE_URL: "",
  KEYCLOAK_CLIENT_ID: "testId",
  KEYCLOAK_SECRET: "randomSecret",
  KEYCLOAK_AUTH_SERVER_URL: "https://myserver.com/auth",
  DOCS_KEYCLOAK_CLIENT_ID: "",
  DOCS_KEYCLOAK_AUTH_URL: "",
  DOCS_KEYCLOAK_TOKEN_URL: "",
  GEDSAPIURL: "",
  GEDSAPIKEY: "",
  REDIS_HOST: "",
  REDIS_PASSWORD: "",
};

const development = {
  ENV: "development",
  PORT: PORT || 8080,
  DATABASE_URL:
    DATABASE_URL ||
    "postgres://api:api@italent-postgres:5432/testdb?schema=public",
  KEYCLOAK_SECRET: KEYCLOAK_SECRET || "",
  KEYCLOAK_CLIENT_ID: KEYCLOAK_CLIENT_ID || "",
  KEYCLOAK_AUTH_SERVER_URL: KEYCLOAK_AUTH_SERVER_URL || "",
  DOCS_KEYCLOAK_CLIENT_ID: DOCS_KEYCLOAK_CLIENT_ID || "upskill-client",
  DOCS_KEYCLOAK_AUTH_URL:
    DOCS_KEYCLOAK_AUTH_URL || "/realms/individual/protocol/openid-connect/auth",
  DOCS_KEYCLOAK_TOKEN_URL:
    DOCS_KEYCLOAK_TOKEN_URL ||
    "/auth/realms/individual/protocol/openid-connect/token",
  GEDSAPIURL:
    GEDSAPIURL ||
    "https://geds-sage-ssc-spc-apicast-production.api.canada.ca/gapi/v2/",
  GEDSAPIKEY: GEDSAPIKEY || "",
  REDIS_HOST: REDIS_HOST || "redis",
  REDIS_PASSWORD: REDIS_PASSWORD || "",
  COOKIE_DOMAIN: COOKIE_DOMAIN || undefined,
  COOKIE_PATH: COOKIE_PATH || "/",
  SESSION_NAME: SESSION_NAME || "local.dev.italent.sid",
  MORGAN_CONFIG: "dev",
};

const config = () => {
  switch (NODE_ENV) {
    case "production":
      return production;

    case "test":
      return test;

    default:
      return development;
  }
};

module.exports = config();
