declare module NodeJS {
  interface Global {
    app: Express.Application;
    mockedKeycloakApp: Express.Application;
    mockedPrismaApp: Express.Application;
  }
}
