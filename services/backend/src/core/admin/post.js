const { getModel } = require("./getModel.js");

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

module.exports = { createOption, bulkDeleteOption };
