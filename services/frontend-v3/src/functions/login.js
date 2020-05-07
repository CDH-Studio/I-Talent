const { post } = require("axios");

const { backendAddress } = require("../config").default;

const createUser = (email, name) => {
  return post(`${backendAddress}api/user/`, {
    email,
    name,
  })
    .then((res) => {
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("color", res.data.user.avatarColor);
      localStorage.setItem("acronym", res.data.user.nameInitials);
      return { res, hasProfile: res.data.hasProfile };
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = { createUser };
