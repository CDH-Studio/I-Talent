const getModel = require("./getModel.js").getModel;
const Models = require("../../models");
const User = Models.user;
const Profile = Models.profile;

const updateOption = async (request, response) => {
  try {
    const { id, type } = request.params;
    const model = getModel(type);

    dbObject = {
      id: id,
      ...request.body
    };
    if (type === "skill" || type === "competency") {
      dbObject.type = type;
    }

    await model
      .update(dbObject, { where: { id: id } })
      .then(updateInfo =>
        response
          .status(200)
          .json({ updatePerformed: updateInfo[0] === 1, error: null })
      );
  } catch (error) {
    response.status(500).json({ updatePerformed: null, error: error });
  }
};

const updateInactive = async (request, response) => {
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
};

const updateFlagged = async (request, response) => {
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
};

const updateProfileStatus = async (request, response) => {
  const statuses = Object.entries(request.body);
  try {
    statuses.forEach(async ([id, status]) => {
      let flagged = false,
        inactive = false;
      if (status === "Inactive") {
        inactive = true;
      }
      if (status === "Hidden") {
        flagged = true;
      }
      await User.findOne({ where: { id } }).then(user =>
        user.update({ inactive }).then(() => {
          user.getProfile().then(profile => profile.update({ flagged }));
        })
      );
    });
    response.status(200).send("OK");
  } catch (error) {
    response.status(500).json({ updatePerformed: false, error: error });
  }
};

module.exports = {
  updateOption,
  updateFlagged,
  updateInactive,
  updateProfileStatus
};
