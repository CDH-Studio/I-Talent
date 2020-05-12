const moment = require("moment");
const Models = require("../../../../database/models");

const Profiles = Models.profile; // Profiles Table

async function growthRateByMonth() {
  // Object Structure: {Year, Data: [{Month, # of Occurrences}]}
  let monthlyGrowthRate = [];

  const profiles = await Profiles.findAll({
    attributes: ["id", "createdAt"],
  });

  profiles.forEach((profile) => {
    const profileCreatedAt = moment(profile.createdAt);

    const profileMonth = profileCreatedAt.month();

    const profileYear = profileCreatedAt.year();

    const indexYear = monthlyGrowthRate.findIndex(
      (object) => object.year === profileYear
    );

    if (indexYear != -1) {
      const indexMonth = monthlyGrowthRate[indexYear].data.findIndex(
        (object) => object.month === profileMonth
      );

      if (indexMonth != -1) {
        monthlyGrowthRate[indexYear].data[indexMonth].count =
          monthlyGrowthRate[indexYear].data[indexMonth].count + 1;
      } else {
        monthlyGrowthRate[indexYear].data.push({
          month: profileMonth,
          count: 1,
        });
      }
    } else {
      monthlyGrowthRate.push({
        year: profileYear,
        data: [
          {
            month: profileMonth,
            count: 1,
          },
        ],
      });
    }
  });

  for (let i = 0; i < monthlyGrowthRate.length; i++) {
    monthlyGrowthRate[i].data.sort((a, b) => a.month - b.month);
  }

  monthlyGrowthRate = monthlyGrowthRate.map((entry) => {
    const newData = [];
    const newMonth = [];

    entry.data.forEach((month) => {
      newMonth[month.month] = month.count;
    });

    for (let i = 0; i < 12; i++) {
      newData.push({
        month: i,
        count: newMonth[i] || 0,
      });
    }
    entry.data = newData;
    return entry;
  });

  const months = moment.monthsShort();

  monthlyGrowthRate = monthlyGrowthRate.map((entry) => {
    const addData = [];

    for (let i = 0; i < 12; i++) {
      addData.push({
        month: i,
        monthName: months[i],
        count: entry.data[i].count,
      });
    }
    entry.data = addData;
    return entry;
  });

  // Growth Rate By Month Graph Data:
  const graphicalData = [];

  monthlyGrowthRate = monthlyGrowthRate.map((entry) => {
    for (let i = 0; i < 12; i++) {
      graphicalData.push({
        year: entry.year.toString(),
        monthNumber: i,
        monthName: entry.data[i].monthName,
        count: entry.data[i].count,
      });
    }
    return entry;
  });

  // Users Added This Month & Growth Rate Percentage:
  const current_year = moment().year();

  const current_month = moment().month();

  const indexYear = monthlyGrowthRate.findIndex(
    (object) => object.year === current_year
  );

  const current_month_additions = monthlyGrowthRate[indexYear].data.find(
    (object) => object.month === current_month
  );

  let previous_month_additions = {};

  if (current_month === 0) {
    previous_month_additions = monthlyGrowthRate[indexYear - 1].data.find(
      (object) => object.month === 11
    );
  } else {
    previous_month_additions = monthlyGrowthRate[indexYear].data.find(
      (object) => object.month === current_month - 1
    );
  }
  let growthRateFromPreviousMonth = Math.round(
    ((current_month_additions.count - previous_month_additions.count) /
      previous_month_additions.count) *
      100
  );

  if (growthRateFromPreviousMonth === Infinity) {
    growthRateFromPreviousMonth = "N/A";
  }

  return {
    graphicalData,
    current_month_additions,
    growthRateFromPreviousMonth,
  };
}

module.exports = growthRateByMonth;
