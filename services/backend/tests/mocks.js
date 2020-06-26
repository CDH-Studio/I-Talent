const mockKeycloak = () => {
  jest.resetModules();
  jest.mock("../src/auth/keycloak", () => ({
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

const mockPrisma = () => {
  jest.resetModules();
  jest.mock("../src/database/client");
};

const unMock = () => {
  jest.resetModules();
  jest.unmock("../src/auth/keycloak").unmock("../src/database/client");
};

module.exports = {
  mockKeycloak,
  mockPrisma,
  unMock,
};
