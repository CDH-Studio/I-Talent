const get = require("./get");
const post = require("./post");

module.exports = {
  getUser: get.getUser,
  getUserById: get.getUserById,
  createUser: post.createUser
};
