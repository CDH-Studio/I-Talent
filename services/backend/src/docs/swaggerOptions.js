const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const config = require("../config");

const specs = swaggerJsdoc({
  swaggerDefinition: {
    info: {
      title: "I-Talent API",
      version: "1.0.0",
      description:
        "Exposed [express](https://expressjs.com/) node.js API endpoints for the I-Talent frontend querying a PostgreSQL database with [prisma.io](https://www.prisma.io/). \n\n Select a tag (category) to reveal information about the endpoints and select an endpoint to test them. To query the API, you'll need to authenticate yourself with your ISED account below or by clicking on any locks. \n\n __Note:__ You will need to request a new token every minute (log out and re-authenticate yourself)",
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
      contact: {
        name: "GitHub",
        url: "https://github.com/CDH-Studio/UpSkill",
      },
    },
    securityDefinitions: {
      Keycloak: {
        type: "oauth2",
        authorizationUrl:
          config.KEYCLOAK_AUTH_SERVER_URL + config.DOCS_KEYCLOAK_AUTH_URL,
        tokenUrl:
          config.KEYCLOAK_AUTH_SERVER_URL + config.DOCS_KEYCLOAK_TOKEN_URL,
        flow: "accessCode",
      },
    },
  },
  apis: [
    "./src/router/*/docs.yml",
    "./src/router/*/docs/*.yml",
    "./src/docs/*.yml",
  ],
});

module.exports = swaggerUi.setup(specs, {
  customSiteTitle: "I-Talent API Docs",

  swaggerOptions: {
    oauth: {
      clientId: config.DOCS_KEYCLOAK_CLIENT_ID,
      clientSecret: config.KEYCLOAK_SECRET,
    },
    defaultModelsExpandDepth: -1,
    filter: true,
    withCredentials: true,
    tagsSorter: (a, b) => {
      return a.localeCompare(b);
    },
  },
});
