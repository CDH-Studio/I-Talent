const Models = require("../../../../models");

const User = Models.user;
const Profile = Models.profile;

const dashboardCount = async () => {
  try {
    const flagged = await Profile.count({
      where: { flagged: true },
    });

    const inactive = await User.count({
      where: { inactive: true },
    });

    const user = await Profile.count();

    const exFeeder = await Profile.count({
      where: { exFeeder: true },
    });

    return { user, exFeeder, flagged, inactive };
  } catch (error) {
    throw new Error("Count failed");
  }
};

module.exports = dashboardCount;
