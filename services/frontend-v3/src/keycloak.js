export default {
  keycloakJSONConfig: {
    realm: "individual",
    url: process.env.REACT_APP_KEYCLOAK_AUTH_SERVER_URL,
    "ssl-required": "external",
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
    "public-client": true,
    "confidential-port": 0,
  },
};
