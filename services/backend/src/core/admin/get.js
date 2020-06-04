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

    if (["skill", "competency"].includes(type)) {
      options.where = { type };
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

    let rows = {};

    if (type === "skill") {
      rows = await Category.findAll();
    }

    response.status(200).json(rows);
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
  getUser,
  checkAdmin,
};
