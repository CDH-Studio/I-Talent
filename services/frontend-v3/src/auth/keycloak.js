import Keycloak from "keycloak-js";
import config from "../utils/runtimeConfig";

const keycloakConfig = {
  realm: "individual",
  url: config.keycloakServerUrl,
  "ssl-required": "external",
  clientId: config.keycloakClientId,
  "public-client": true,
  "confidential-port": 0,
};

const initKeycloakConfig = {
  onLoad: "check-sso",
  promiseType: "native",
  checkLoginIframe: false,
};

const keycloak = new Keycloak(keycloakConfig);

export { keycloak, initKeycloakConfig };
