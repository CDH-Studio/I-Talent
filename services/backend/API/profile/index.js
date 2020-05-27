const get = require("./get");
const post = require("./post");
const put = require("./put");

module.exports = {
  getProfile: get.getProfile,
  getPrivateProfileById: get.getPrivateProfileById,
  getPublicProfileById: get.getPublicProfileById,
  createProfile: post.createProfile,
  updateProfile: put.updateProfile
};
