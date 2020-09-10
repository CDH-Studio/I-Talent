const {
  NODE_ENV,
  PORT,
  DATABASE_URL,
  KEYCLOAK_SECRET,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_AUTH_SERVER_URL,
  TEST_DATABASE,
  TEST_DATABASE_URL,
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
};

const test = {
  ENV: "test",
  PORT: "",
  TEST_DATABASE: TEST_DATABASE || "jesttest",
  TEST_DATABASE_URL:
    TEST_DATABASE_URL ||
    "postgres://api:api@localhost:5432/jesttest?schema=public",
  DATABASE_URL:
    DATABASE_URL || "postgres://api:api@db-postgres:5432/testdb?schema=public",
  KEYCLOAK_SECRET: "secret",
  KEYCLOAK_CLIENT_ID: "",
  KEYCLOAK_AUTH_SERVER_URL: "",
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
    DATABASE_URL || "postgres://api:api@db-postgres:5432/testdb?schema=public",
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
  COOKIE_PATH: COOKIE_PATH || undefined,
  SESSION_NAME: SESSION_NAME || undefined,
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
