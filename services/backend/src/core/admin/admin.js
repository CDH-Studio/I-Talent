const { getUsers, updateUserStatuses } = require("./util/users");

const checkAdmin = (request, response) =>
  response.status(200).send("Access Granted");

module.exports = {
  getUsers,
  updateUserStatuses,
  checkAdmin,
};
