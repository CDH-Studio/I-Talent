const _ = require("lodash");
const moment = require("moment");
const prisma = require("../../database");
const { normalizeDate } = require("./util/date");
const { getKeycloakUserId } = require("../../utils/keycloak");
const { hasVisibility } = require("./util/profileVisibility");

async function getSecondLangProfs(request, response) {
  const { userId } = request.params;

  const keycloakId = getKeycloakUserId(request);

  if (await hasVisibility(userId, keycloakId, "officialLanguage", request)) {
    const query = await prisma.secondLangProf.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        date: true,
        proficiency: true,
        level: true,
        unknownExpiredDate: true,
      },
    });

    const secondLangProfs = _.sortBy(
      query.map(({ id, date, proficiency, level, unknownExpiredDate }) => {
        let expired = unknownExpiredDate;

        if (!unknownExpiredDate && date) {
          if (moment(date).isBefore()) {
            expired = true;
          } else {
            expired = null;
          }
        }

        return {
          id,
          date,
          proficiency,
          expired,
          level,
        };
      }),
      "name"
    );

    response.status(200).json(secondLangProfs);
  } else {
    response.status(200).json([]);
  }
}

async function setSecondLangProfs(request, response) {
  const { userId } = request.params;
  const data = request.body;
  await prisma.$transaction([
    prisma.secondLangProf.deleteMany({
      where: {
        userId,
        proficiency: {
          notIn: data.map((i) => i.proficiency),
        },
      },
    }),
    prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        secondLangProfs: {
          upsert: data.map(
            ({ proficiency, level, date, unknownExpiredDate }) => ({
              where: {
                userId_proficiency: {
                  userId,
                  proficiency,
                },
              },
              create: {
                proficiency,
                level,
                date: normalizeDate(date, "day"),
                unknownExpiredDate,
              },
              update: {
                level,
                date: normalizeDate(date, "day"),
                unknownExpiredDate,
              },
            })
          ),
        },
      },
    }),
  ]);

  response.sendStatus(204);
}

module.exports = {
  getSecondLangProfs,
  setSecondLangProfs,
};
