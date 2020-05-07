const getModel = require("./getModel.js").getModel;

const deleteOption = async (request, response) => {
  try {
    const { id, type } = request.params;
    const model = getModel(type);

    model
      .destroy({
        where: { id: id }
      })
      .then(destroyCount =>
        response
          .status(200)
          .json({ deletePerformed: destroyCount === 1, error: null })
      );
  } catch (error) {
    response.status(500).json({ deletePerformed: false, error: error });
  }
};

module.exports = { deleteOption };
