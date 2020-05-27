const moment = require('moment');
const Models = require('../../../../database/models');

const Profiles = Models.profile; // Profiles Table

async function growthRateByWeek() {
  let countNewUsers = [];

  const profiles = await Profiles.findAll({
    attributes: ['id', 'createdAt'],
  });

  const currentDate = moment();

  profiles.forEach((profile) => {
    const profileTime = moment(profile.createdAt);
    const difference = currentDate.diff(profileTime, 'weeks');
    countNewUsers[difference] = countNewUsers[difference]
      ? countNewUsers[difference] + 1
      : 1;
  });

  countNewUsers = Array.from(countNewUsers, (item) => item || 0);

  return countNewUsers;
}

module.exports = growthRateByWeek;
