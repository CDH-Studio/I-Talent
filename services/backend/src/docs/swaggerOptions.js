const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const specs = swaggerJsdoc({
  swaggerDefinition: {
    info: {
      title: "I-Talent API",
      version: "1.0.0",
      description:
        "Exposed [express](https://expressjs.com/) node.js API endpoints for the I-Talent frontend querying a PostgreSQL database with [prisma.io](https://www.prisma.io/). \n\n To query the API, you'll need to authenticate yourself with your ISED account below.",
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
        authorizationUrl: process.env.DOCS_KEYCLOAK_AUTH_URL,
        tokenUrl: process.env.DOCS_KEYCLOAK_TOKEN_URL,
        flow: "accessCode",
      },
    },
  },
  apis: ["./src/router/*/docs.yml", "./src/docs/*.yml"],
});

module.exports = swaggerUi.setup(specs, {
  customSiteTitle: "I-Talent API",
  customfavIcon: "http://localhost:3000/favicon.ico",
  customCss:
    ".swagger-ui .topbar { display: none } .swagger-ui .scheme-container { background: none; box-shadow: none }",
  swaggerOptions: {
    oauth: {
      clientId: process.env.DOCS_KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_SECRET,
    },
    defaultModelsExpandDepth: -1,
    filter: true,
    withCredentials: true,
  },
});
