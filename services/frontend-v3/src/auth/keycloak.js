import config from "../utils/config";

const keycloakConfig = {
  realm: "individual",
  url: config.keycloakServerUrl,
  "ssl-required": "external",
  clientId: config.keycloakClientId,
  "public-client": true,
  "confidential-port": 0,
};

const keycloak = typeof window !== "undefined" ? (() => {
  // eslint-disable-next-line global-require
  const Keycloak = require("keycloak-js");

  return new Keycloak(keycloakConfig);
})() : {};

export default keycloak;
