const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const {
	getOption,
	getCategories,
	getFlagged,
	getInactive,
	getUser,
	checkAdmin,
	deleteOption,
	createOption,
	bulkDeleteOption,
	updateOption,
	updateFlagged,
	updateInactive,
	updateProfileStatus,
} = require("../../core/admin/admin");

const reporting = require("../../core/admin/reporting/index");

function catchAdminCheck(token) {
	let hasRole = false;
	try {
		hasRole = token.hasRole("view-admin-console");
		return hasRole;
	} catch (error) {
		return false;
	}
}

const adminRouter = Router();

adminRouter.get(
	"/options/:type",
	keycloak.protect("view-admin-console"),
	getOption
);

adminRouter.get(
	"/options/categories/:type",
	keycloak.protect("view-admin-console"),
	getCategories
);

adminRouter.get(
	"/flagged/:id",
	keycloak.protect("view-admin-console"),
	getFlagged
);

adminRouter.get(
	"/inactive/:id",
	keycloak.protect("view-admin-console"),
	getInactive
);

adminRouter.get("/user", keycloak.protect("view-admin-console"), getUser);

adminRouter.get("/check", keycloak.protect(catchAdminCheck), checkAdmin);

adminRouter.post(
	"/options/:type",
	keycloak.protect("manage-options"),
	createOption
);

adminRouter.post(
	"/delete/:type",
	keycloak.protect("manage-options"),
	bulkDeleteOption
);

adminRouter.put("/profileStatus", keycloak.protect(), updateProfileStatus);

adminRouter
	.route("/options/:type/:id")
	.put(keycloak.protect("manage-options"), updateOption)
	.delete(keycloak.protect("manage-options"), deleteOption);

adminRouter.put("/flagged", keycloak.protect("manage-users"), updateFlagged);

adminRouter.put("/inactive", keycloak.protect("manage-users"), updateInactive);

adminRouter.get("/dashboard", reporting.get.statistics);

module.exports = adminRouter;
