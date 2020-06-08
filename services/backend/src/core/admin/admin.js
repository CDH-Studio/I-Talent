const { getModel } = require("./util/getModel");
const Models = require("../../database/models");

const User = Models.user;
const Profile = Models.profile;
const Tenure = Models.tenure;
const Category = Models.category;

const deleteOption = async (request, response) => {
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
};

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

const createOption = async (request, response) => {
  try {
    const { type } = request.params;
    const model = getModel(type);

    const dbObject = {
      ...request.body,
    };

    if (["skill", "competency", "category"].includes(type)) {
      dbObject.type = type;
    }

    await model.create(dbObject, { returning: true });
    response.status(200).send("OK");
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const bulkDeleteOption = async (request, response) => {
  try {
    const { type } = request.params;
    const { ids } = request.body;
    const model = getModel(type);

    const destroyCount = await model.destroy({
      where: { id: ids },
    });

    response.status(200).json({ deletePerformed: destroyCount > 0 });
  } catch (error) {
    response.status(500).json({ deletePerformed: false, error: error });
  }
};

const updateOption = async (request, response) => {
  try {
    const { id, type } = request.params;
    const model = getModel(type);

    const dbObject = {
      ...request.body,
      id,
    };

    if (["skill", "competency"].includes(type)) {
      dbObject.type = type;
    }

    const updatedModel = await model.update(dbObject, { where: { id } });

    response.status(200).json({ updatePerformed: !!updatedModel, error: null });
  } catch (error) {
    response.status(500).json({ updatePerformed: null, error: error });
  }
};

const updateProfileStatus = async (request, response) => {
  const statuses = Object.entries(request.body);
  await Promise.all(
    statuses.map(async ([id, status]) => {
      const flagged = ["Hidden", "Caché"].includes(status);
      const inactive = ["Inactive", "Inactif"].includes(status);

      const user = await User.findOne({ where: { id } });

      if (user) {
        await user.update({ inactive });
        const profile = await user.getProfile();

        if (profile) await profile.update({ flagged });
      }
    })
  )
    .then(() => {
      response.status(200).send("OK");
    })
    .catch((error) => {
      response.status(500).json({ updatePerformed: false, error: error });
    });
};

module.exports = {
  deleteOption,
  getOption,
  getCategories,
  getUser,
  checkAdmin,
  createOption,
  bulkDeleteOption,
  updateOption,
  updateProfileStatus,
};
