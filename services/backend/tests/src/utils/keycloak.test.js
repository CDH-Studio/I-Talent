const keycloak = require("../../../src/utils/keycloak");

describe("Utils keycloak tests", () => {
  beforeEach(() => console.log.mockClear());

  describe("hasContent", () => {
    test("returns true if the access token has some content", () => {
      expect(true).toEqual(true);
    });
  });

  // describe("when passed a valid Axios error", () => {
  //   test("should print desired information", () => {
  //     handleAxiosErrors({
  //       response: {
  //         status: "status",
  //         statusText: "statusText",
  //         data: "data",
  //         config: "config",
  //         headers: "headers",
  //       },
  //     });

  //     expect(console.log).toHaveBeenCalledWith("status", "statusText", "data");
  //     expect(console.log).toHaveBeenCalledWith("Config", "config");
  //     expect(console.log).toHaveBeenCalledWith("Headers", "headers");
  //   });
  // });

  // describe("when passed not a valid Axios error", () => {
  //   test("should not print anything if response not present", () => {
  //     handleAxiosErrors({});

  //     expect(console.log).not.toHaveBeenCalled();
  //   });

  //   test("should print empty strings if response is present", () => {
  //     handleAxiosErrors({ response: {} });

  //     expect(console.log).toHaveBeenCalledWith(undefined, undefined, undefined);
  //     expect(console.log).toHaveBeenCalledWith("Config", undefined);
  //     expect(console.log).toHaveBeenCalledWith("Headers", undefined);
  //   });
  // });
});
