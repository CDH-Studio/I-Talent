const getModel = require("./getModel.js").getModel;

const createOption = async (request, response) => {
  try {
    const { type } = request.params;
    const model = getModel(type);

    dbObject = {
      ...request.body
    };
    if (type === "skill" || type === "competency") {
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
    const ids = request.body.ids;
    const model = getModel(type);

    model
      .destroy({
        where: { id: ids }
      })
      .then(destroyCount =>
        response.status(200).json({ deletePerformed: destroyCount > 1 })
      );
  } catch (error) {
    response.status(500).json({ deletePerformed: false, error: error });
  }
};

module.exports = { createOption, bulkDeleteOption };
