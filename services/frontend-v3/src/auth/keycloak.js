import Keycloak from "keycloak-js";

const keycloakConfig = {
  realm: "individual",
  url: process.env.REACT_APP_KEYCLOAK_AUTH_SERVER_URL,
  "ssl-required": "external",
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
  "public-client": true,
  "confidential-port": 0,
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
