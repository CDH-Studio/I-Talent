const production = {
  ENV: "production",
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  KEYCLOAK_SECRET: process.env.KEYCLOAK_SECRET,
  KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
  KEYCLOAK_AUTH_SERVER_URL: process.env.KEYCLOAK_AUTH_SERVER_URL,
  DOCS_KEYCLOAK_CLIENT_ID: "",
  DOCS_KEYCLOAK_AUTH_URL: "",
  DOCS_KEYCLOAK_TOKEN_URL: "",
  GEDSAPIURL: process.env.GEDSAPIURL,
  GEDSAPIKEY: process.env.GEDSAPIKEY,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
};

const test = {
  ENV: "test",
  PORT: "",
  DATABASE_URL: "",
  KEYCLOAK_SECRET: "",
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
  PORT: process.env.PORT || 8080,
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgres://api:api@db-postgres:5432/testdb?schema=public",
  KEYCLOAK_SECRET: process.env.KEYCLOAK_SECRET || "",
  KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID || "",
  KEYCLOAK_AUTH_SERVER_URL: process.env.KEYCLOAK_AUTH_SERVER_URL || "",
  DOCS_KEYCLOAK_CLIENT_ID:
    process.env.DOCS_KEYCLOAK_CLIENT_ID || "upskill-client",
  DOCS_KEYCLOAK_AUTH_URL:
    process.env.DOCS_KEYCLOAK_AUTH_URL ||
    "/realms/individual/protocol/openid-connect/auth",
  DOCS_KEYCLOAK_TOKEN_URL:
    process.env.DOCS_KEYCLOAK_TOKEN_URL ||
    "/auth/realms/individual/protocol/openid-connect/token",
  GEDSAPIURL:
    process.env.GEDSAPIURL ||
    "https://geds-ssc-spc-apicast-production.api.canada.ca/gapi/v2/",
  GEDSAPIKEY: process.env.GEDSAPIKEY || "",
  REDIS_HOST: process.env.REDIS_HOST || "redis",
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
};

const config = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return production;

    case "test":
      return test;

    default:
      return development;
  }
};

module.exports = config();
