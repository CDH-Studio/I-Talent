const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const specs = swaggerJsdoc({
  swaggerDefinition: {
    info: {
      title: "I-Talent API",
      version: "1.0.0",
      description: "Exposed API endpoints for the I-Talent frontend",
    },
    securityDefinitions: {
      Keycloak: {
        type: "oauth2",
        authorizationUrl: process.env.DOCS_KEYCLOAK_AUTH_URL,
        tokenUrl: process.env.DOCS_KEYCLOAK_TOKEN_URL,
        flow: "accessCode",
      },
    },
  },
  apis: ["./src/router/*/*.js", "./src/docs/definitions.js"],
});

module.exports = swaggerUi.setup(specs, {
  customSiteTitle: "I-Talent API",
  customfavIcon: "http://localhost:3000/favicon.ico",
  swaggerOptions: {
    oauth: {
      clientId: process.env.DOCS_KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_SECRET,
    },
  },
});
