const moment = require("moment");
const Sequelize = require("sequelize");
const Models = require("../../../../models");
const Profiles = Models.profile; // Profiles Table

const growthRateByMonth = async () => {
  // Object Structure: {Year, Data: [{Month, # of Occurrences}]}
  let growthRate = [];

  const profiles = await Profiles.findAll({
    attributes: ["id", "createdAt"]
  });

  profiles.forEach(profile => {
    const profileCreatedAt = moment(profile.createdAt);

    const profileMonth = profileCreatedAt.month();

    const profileYear = profileCreatedAt.year();

    const indexYear = growthRate.findIndex(
      object => object.year == profileYear
    );

    if (indexYear != -1) {
      const indexMonth = growthRate[indexYear].data.findIndex(
        object => object.month == profileMonth
      );

      if (indexMonth != -1) {
        growthRate[indexYear].data[indexMonth].count =
          growthRate[indexYear].data[indexMonth].count + 1;
      } else {
        growthRate[indexYear].data.push({
          month: profileMonth,
          count: 1
        });
      }
    } else {
      growthRate.push({
        year: profileYear,
        data: [
          {
            month: profileMonth,
            count: 1
          }
        ]
      });
    }
  });

  for (let i = 0; i < growthRate.length; i++) {
    growthRate[i].data.sort((a, b) => a.month - b.month);
  }

  growthRate = growthRate.map((entry, index) => {
    let newData = [];
    let newMonth = [];

    entry.data.forEach(month => {
      newMonth[month.month] = month.count;
    });

    for (let i = 0; i < 12; i++) {
      newData.push({
        month: i,
        count: newMonth[i] || 0
      });
    }
    entry.data = newData;
    return entry;
  });

  return growthRate;
};

module.exports = growthRateByMonth;
