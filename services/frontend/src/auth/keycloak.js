import Keycloak from "keycloak-js";

import config from "../utils/runtimeConfig";

const keycloakConfig = {
  clientId: config.keycloakClientId,
  "confidential-port": 0,
  "public-client": true,
  realm: "individual",
  "ssl-required": "external",
  url: config.keycloakServerUrl,
};

const initKeycloakConfig = {
  checkLoginIframe: false,
  onLoad: "check-sso",
  promiseType: "native",
};

const keycloak = new Keycloak(keycloakConfig);

export { initKeycloakConfig,keycloak };
