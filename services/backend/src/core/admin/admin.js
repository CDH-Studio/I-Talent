const { getUsers, updateUserStatuses } = require("./util/users");

const checkAdmin = (request, response) => response.status(200).send(true);

module.exports = {
  getUsers,
  updateUserStatuses,
  checkAdmin,
};
