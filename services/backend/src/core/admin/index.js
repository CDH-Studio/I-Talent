const put = require("./put");
const post = require("./post");
const del = require("./delete");
const get = require("./get");

const report = require("./reporting");

module.exports = {
	createOption: post.createOption,
	bulkDeleteOption: post.bulkDeleteOption,
	deleteOption: del.deleteOption,
	updateOption: put.updateOption,
	getOption: get.getOption,
	getCategories: get.getCategories,
	updateFlagged: put.updateFlagged,
	updateInactive: put.updateInactive,
	getFlagged: get.getFlagged,
	getInactive: get.getInactive,
	getUser: get.getUser,
	checkAdmin: get.checkAdmin,
	updateProfileStatus: put.updateProfileStatus,
	getStatistics: report.get.statistics,
	getSkillsReport: report.skillsReport,
};
