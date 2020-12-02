/* eslint-disable global-require */

const redisMock = () => {
  jest.mock("redis", () => require("redis-mock"));
};

module.exports = {
  redisMock,
};
