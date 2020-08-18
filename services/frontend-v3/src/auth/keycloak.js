import config from "../utils/config";

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

export { keycloakConfig, initKeycloakConfig };
