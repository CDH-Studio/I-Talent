const keycloakMock = () => {
  jest.mock("../../src/auth/keycloak", () => ({
    keycloak: {
      protect() {
        return (_req, _res, next) => {
          next();
        };
      },
      middleware() {
        return (_req, _res, next) => {
          next();
        };
      },
    },
    sessionInstance(_req, _res, next) {
      next();
    },
  }));
};

module.exports = {
  keycloakMock,
};
