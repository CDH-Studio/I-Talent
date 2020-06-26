const moment = require("moment");
const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function growthRateByWeek(request, response) {
  try {
    const userCreationPerWeek = {};

    const profiles = await prisma.user.findMany({
      select: {
        id: true,
        createdAt: true,
      },
    });

    const currentDate = moment();

    profiles.forEach((profile) => {
      const createdAt = moment(profile.createdAt);
      const weekNum = currentDate.diff(createdAt, "weeks");

      if (!(weekNum in userCreationPerWeek)) {
        userCreationPerWeek[weekNum] = 0;
      }

      userCreationPerWeek[weekNum] += 1;
    });

    response.status(200).json(userCreationPerWeek);
  } catch (error) {
    console.log(error);
    response.status(500).send("Error fetching growth rate by week");
  }
}

async function growthRateByMonth(request, response) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (users.length === 0) {
      response.status(500).send("No users in the database");
    }

    // OLD Object Structure: [{year, data: [{month, count: # of Occurrences}]}]
    // NEW object Structure: {year: {month: # of Occurrences}}
    const growthRate = {};

    // Populate emptry data in monthlyGrowthRate according to the oldest user
    const currentDate = moment();
    const oldestUserDate = moment(users[0].createdAt);

    while (oldestUserDate.isSameOrBefore(currentDate)) {
      const currentYear = oldestUserDate.year();
      const currentMonth = oldestUserDate.month();

      growthRate[currentYear] = { [currentMonth]: 0 };
      oldestUserDate.add(1, "month");
    }

    // Updated the growth rate according to user entries
    users.forEach((profile) => {
      const profileCreatedAt = moment(profile.createdAt);
      const profileMonth = profileCreatedAt.month();
      const profileYear = profileCreatedAt.year();

      growthRate[profileYear][profileMonth] += 1;
    });

    // Users Added This Month & Growth Rate Percentage
    const currentYear = moment().year();
    const currentMonth = moment().month();

    const currentMonthNewUserCount = growthRate[currentYear][currentMonth];

    let previousMonthAdditions = 0;

    if (currentMonth === 0) {
      // eslint-disable-next-line prefer-destructuring
      previousMonthAdditions = growthRate[currentYear - 1][11];
    } else {
      previousMonthAdditions = growthRate[currentYear][currentMonth - 1];
    }

    let growthRateFromPreviousMonth = 0;

    if (!previousMonthAdditions || previousMonthAdditions === 0) {
      growthRateFromPreviousMonth = currentMonthNewUserCount * 100;
    } else {
      growthRateFromPreviousMonth = Math.round(
        ((currentMonthNewUserCount - previousMonthAdditions) /
          previousMonthAdditions) *
          100
      );
    }

    response.status(200).json({
      growthRate,
      growthRateFromPreviousMonth,
      currentMonthNewUserCount,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send("Error fetching growth rate by month");
  }
}

module.exports = {
  growthRateByWeek,
  growthRateByMonth,
};
