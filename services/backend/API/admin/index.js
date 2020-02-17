const put = require("./put");
const post = require("./post");
const del = require("./delete");
const get = require("./get");

module.exports = {
  createOption: post.createOption,
  bulkDeleteOption: post.bulkDeleteOption,
  deleteOption: del.deleteOption,
  updateOption: put.updateOption,
  getOption: get.getOption,
  updateFlagged: put.updateFlagged,
  updateInactive: put.updateInactive,
  getFlagged: get.getFlagged,
  getInactive: get.getInactive,
  getUser: get.getUser,
  dashboardCount: get.dashboardCount,
  checkAdmin: get.checkAdmin,
  updateProfileStatus: put.updateProfileStatus,
  getStatistics: get.statistics
};
