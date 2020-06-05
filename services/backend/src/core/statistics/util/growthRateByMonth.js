const moment = require("moment");
const Models = require("../../../database/models");

const Profiles = Models.profile; // Profiles Table

async function growthRateByMonth() {
  // Object Structure: [{year, data: [{month, count: # of Occurrences}]}
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

    if (indexYear !== -1) {
      const indexMonth = monthlyGrowthRate[indexYear].data.findIndex(
        (object) => object.month === profileMonth
      );

      if (indexMonth !== -1) {
        monthlyGrowthRate[indexYear].data[indexMonth].count += 1;
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

  // Sorts monthlyGrowthRate.data by month
  for (let i = 0; i < monthlyGrowthRate.length; i += 1) {
    monthlyGrowthRate[i].data.sort((a, b) => a.month - b.month);
  }

  const months = moment.monthsShort();

  monthlyGrowthRate = monthlyGrowthRate.map((entry) => {
    const newMonth = [];
    entry.data.forEach(({ month, count }) => {
      newMonth[month] = count;
    });

    const newData = [];
    for (let i = 0; i < 12; i += 1) {
      newData.push({
        month: i,
        monthName: months[i],
        count: newMonth[i] || 0,
      });
    }

    return {
      ...entry,
      data: newData,
    };
  });

  // Growth Rate By Month Graph Data:
  const graphicalData = [];

  monthlyGrowthRate.forEach(({ year, data }) => {
    for (let i = 0; i < 12; i += 1) {
      graphicalData.push({
        year: year.toString(),
        monthNumber: i,
        monthName: data[i].monthName,
        count: data[i].count,
      });
    }
  });

  // Users Added This Month & Growth Rate Percentage:
  const currentYear = moment().year();
  const currentMonth = moment().month();

  const indexYear = monthlyGrowthRate.findIndex(
    (object) => object.year === currentYear
  );

  const currentMonthAdditions = monthlyGrowthRate[indexYear].data.find(
    (object) => object.month === currentMonth
  );

  let previousMonthAdditions = {};

  if (currentMonth === 0) {
    previousMonthAdditions = monthlyGrowthRate[indexYear - 1].data.find(
      (object) => object.month === 11
    );
  } else {
    previousMonthAdditions = monthlyGrowthRate[indexYear].data.find(
      (object) => object.month === currentMonth - 1
    );
  }

  let growthRateFromPreviousMonth = Math.round(
    ((currentMonthAdditions.count - previousMonthAdditions.count) /
      previousMonthAdditions.count) *
      100
  );

  if (growthRateFromPreviousMonth === Infinity) {
    growthRateFromPreviousMonth = "N/A";
  }

  return {
    graphicalData,
    currentMonthAdditions,
    growthRateFromPreviousMonth,
  };
}

module.exports = growthRateByMonth;
