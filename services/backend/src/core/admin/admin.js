const { getModel } = require("./util/getModel.js");
const Models = require("../../database/models");

const User = Models.user;
const Profile = Models.profile;
const Tenure = Models.tenure;
const Category = Models.category;

async function getOption(request, response) {
	try {
		const { type } = request.params;
		const model = getModel(type);

		const options = {
			attributes: { exclude: ["createdAt", "updatedAt"] },
		};

		if (type === "skill" || type === "competency") {
			options.where = { type: type };
		}

		if (type === "skill") {
			options.include = Category;
		}

		const rows = await model.findAll(options);
		response.status(200).json(rows);
	} catch (error) {
		response.status(500).json(error);
	}
}

async function getCategories(request, response) {
	try {
		const { type } = request.params;
		if (type === "skill") {
			const rows = await Category.findAll();
			response.status(200).json(rows);
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

async function getFlagged(request, response) {
	try {
		const { id } = request.params;

		await Profile.findOne({ where: { id: id } }).then((row) =>
			response.status(200).json({ value: row.flagged })
		);
	} catch (error) {
		response.status(500).json(error);
	}
}

async function getInactive(request, response) {
	try {
		const { id } = request.params;

		await User.findOne({ where: { id: id } }).then((row) =>
			response.status(200).json({ value: row.inactive })
		);
	} catch (error) {
		response.status(500).json(error);
	}
}

async function getUser(request, response) {
	const values = await Profile.findAll({
		include: [User, Tenure],
		attributes: [
			"id",
			"firstName",
			"lastName",
			"flagged",
			"createdAt",
			"jobTitleEn",
			"jobTitleFr",
		],
	});

	response.status(200).json(values);
}

function checkAdmin(request, response) {
	response.status(200).send("Access Granted");
}

async function deleteOption(request, response) {
	try {
		const { id, type } = request.params;
		const model = getModel(type);

		model
			.destroy({
				where: { id: id },
			})
			.then((destroyCount) =>
				response
					.status(200)
					.json({ deletePerformed: destroyCount === 1, error: null })
			);
	} catch (error) {
		response.status(500).json({ deletePerformed: false, error: error });
	}
}

async function createOption(request, response) {
	try {
		const { type } = request.params;
		const model = getModel(type);

		dbObject = {
			...request.body,
		};
		if (type === "skill" || type === "competency" || type === "category") {
			dbObject.type = type;
		}

		await model.create(dbObject, { returning: true });
		response.status(200).send("OK");
	} catch (error) {
		response.status(500).send(error.message);
	}
}

async function bulkDeleteOption(request, response) {
	try {
		const { type } = request.params;
		const { ids } = request.body;
		const model = getModel(type);

		let result;

		await model
			.destroy({
				where: { id: ids },
			})
			.then((destroyCount) => {
				result = destroyCount > 0;
			})
			.catch(function () {
				console.log("Delete Error!");
				result = false;
			});

		response.status(200).json({ deletePerformed: result });
	} catch (error) {
		response.status(500).json({ deletePerformed: false, error: error });
	}
}

async function updateOption(request, response) {
	try {
		const { id, type } = request.params;
		const model = getModel(type);

		dbObject = {
			id: id,
			...request.body,
		};
		if (type === "skill" || type === "competency") {
			dbObject.type = type;
		}

		await model
			.update(dbObject, { where: { id: id } })
			.then((updateInfo) =>
				response
					.status(200)
					.json({ updatePerformed: updateInfo[0] === 1, error: null })
			);
	} catch (error) {
		response.status(500).json({ updatePerformed: null, error: error });
	}
}

async function updateInactive(request, response) {
	let updates = 0;

	try {
		for (let i = 0; i < request.body.length; i++) {
			const element = request.body[i];
			const updateInfo = await User.update(
				{ inactive: element.value },
				{ where: { id: element.id } }
			);
			updates += updateInfo[0];
		}

		response.status(200).json({ updates: updates, error: null });
	} catch (error) {
		response.status(500).json({ updates: updates, error: error.message });
	}
}

async function updateFlagged(request, response) {
	let updates = 0;

	try {
		for (let i = 0; i < request.body.length; i++) {
			const element = request.body[i];
			const updateInfo = await Profile.update(
				{ flagged: element.value },
				{ where: { id: element.id } }
			);
			updates += updateInfo[0];
		}

		response.status(200).json({ updates: updates, error: null });
	} catch (error) {
		response.status(500).json({ updates: updates, error: error.message });
	}
}

async function updateProfileStatus(request, response) {
	const statuses = Object.entries(request.body);
	try {
		statuses.forEach(async ([id, status]) => {
			let flagged = false;
			let inactive = false;
			if (status === "Inactive" || status === "Inactif") {
				inactive = true;
			}
			if (status === "Hidden" || status === "Caché") {
				flagged = true;
			}
			await User.findOne({ where: { id } }).then((user) =>
				user.update({ inactive }).then(() => {
					user.getProfile().then((profile) => profile.update({ flagged }));
				})
			);
		});
		response.status(200).send("OK");
	} catch (error) {
		response.status(500).json({ updatePerformed: false, error: error });
	}
}

module.exports = {
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
};
