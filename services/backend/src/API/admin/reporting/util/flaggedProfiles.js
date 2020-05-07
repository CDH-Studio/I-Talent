const Sequelize = require("sequelize");
const Models = require("../../../../models");

const Profiles = Models.profile; // Profiles Table

const flaggedProfiles = async () => {
  const flag = await Profiles.findAll({
    where: { flagged: true },
    attributes: ["id", "firstName", "lastName"],
  });
  return flag;
};

module.exports = flaggedProfiles;
