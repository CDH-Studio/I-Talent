const { getModel } = require("./getModel.js");
const Models = require("../../database/models");

const User = Models.user;
const Profile = Models.profile;
const Tenure = Models.tenure;
const Category = Models.category;

const getOption = async (request, response) => {
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
};

const getCategories = async (request, response) => {
  try {
    const { type } = request.params;
    if (type === "skill") {
      const rows = await Category.findAll();
      response.status(200).json(rows);
    }
  } catch (error) {
    response.status(500).json(error);
  }
};

const getFlagged = async (request, response) => {
  try {
    const { id } = request.params;

    await Profile.findOne({ where: { id: id } }).then((row) =>
      response.status(200).json({ value: row.flagged })
    );
  } catch (error) {
    response.status(500).json(error);
  }
};

const getInactive = async (request, response) => {
  try {
    const { id } = request.params;

    await User.findOne({ where: { id: id } }).then((row) =>
      response.status(200).json({ value: row.inactive })
    );
  } catch (error) {
    response.status(500).json(error);
  }
};

const getUser = async (request, response) => {
  const values = await Profile.findAll({
    include: [User, Tenure],
    attributes: [
      "id",
      "firstName",
      "lastName",
      // "branchEn",
      // "branchFr",
      "flagged",
      "createdAt",
      "jobTitleEn",
      "jobTitleFr",
    ],
  });

  response.status(200).json(values);
};

const checkAdmin = (request, response) =>
  response.status(200).send("Access Granted");

module.exports = {
  getOption,
  getCategories,
  getFlagged,
  getInactive,
  getUser,
  checkAdmin,
};
