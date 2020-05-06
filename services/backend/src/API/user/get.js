const Models = require("../../models");
const User = Models.user;

const getUser = async (request, response) => {
  response.status(200).json(await User.findAll());
};

const getUserById = async (request, response) => {
  const id = request.params.id;
  response.status(200).json(await User.findOne({ where: { id: id } }));
};

module.exports = {
  getUser,
  getUserById
};
