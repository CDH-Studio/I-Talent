const { getModel } = require("./getModel.js");
const Models = require("../../database/models");

const User = Models.user;

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
  updateOption,
  updateProfileStatus,
};
