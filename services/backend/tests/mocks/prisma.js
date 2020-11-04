const prismaMock = () => {
  jest.mock("../../src/database");
};

module.exports = {
  prismaMock,
};
