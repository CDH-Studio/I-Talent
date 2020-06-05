const Models = require("../../../database/models");

const Profiles = Models.profile;

async function flaggedProfiles() {
  return Profiles.findAll({
    where: { flagged: true },
    attributes: ["id", "firstName", "lastName"],
  });
}

module.exports = flaggedProfiles;
