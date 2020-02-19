const post = require("axios").post;

const backendAddress = require("../config").default.backendAddress;

const createUser = (email, name) => {
  return post(backendAddress + "api/user/", {
    email,
    name
  })
    .then(res => {
      localStorage.setItem("userId", res.data.user.id);
      return { res, hasProfile: res.data.hasProfile };
    })
    .catch(err => {
      throw err;
    });
};

module.exports = { createUser };
