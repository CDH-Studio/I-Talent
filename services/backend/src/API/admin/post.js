const { getModel } = require("./getModel.js");

const createOption = async (request, response) => {
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
};

const bulkDeleteOption = async (request, response) => {
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
};

module.exports = { createOption, bulkDeleteOption };
