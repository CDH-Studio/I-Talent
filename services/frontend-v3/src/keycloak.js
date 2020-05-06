export default {
  keycloakJSONConfig: {
    realm: "individual",
    url: process.env.REACT_APP_KEYCLOAK_AUTH_SERVER_URL,
    "ssl-required": "external",
    clientId: "upskill-client",
    "public-client": true,
    "confidential-port": 0,
  },
};
