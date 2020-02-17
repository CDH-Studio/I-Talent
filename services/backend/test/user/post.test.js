// const post = require("../../API/user/post");

// // Will use index.js from ../models/__mocks__
// jest.mock("../../models");

// const mockRequest = (name, email) => {
//   const req = {};
//   req.body = { name: name, email: email };
//   return req;
// };

// const mockResponse = () => {
//   const res = {};
//   res.status = jest.fn().mockReturnValue(res);
//   res.json = jest.fn().mockReturnValue(res);
//   res.send = jest.fn().mockReturnValue(res);
//   return res;
// };

// describe("createUser", () => {
//   it("Should create user account", async () => {
//     const name = "Bobby Hall";
//     const email = "bobby.hall@canada.ca";
//     const req = mockRequest(name, email);
//     const res = mockResponse();
//     await post.createUser(req, res).then(() => {
//       expect(res.status).toHaveBeenCalledWith(200);
//       console.log("This where I am:", res.json.mock.calls[0][0]);
//       // expect(res.json.mock.calls[0][0]).toHaveProperty("hasProfile", true);
//     });
//   });
// });

it("Should be implemented later", async () => {});
