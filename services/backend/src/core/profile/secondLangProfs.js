const _ = require("lodash");
const moment = require("moment");
const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");
const { normalizeDate } = require("./util/date");

async function getSecondLangProfs(request, response) {
  const userId = getKeycloakUserId(request);

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

  const competencies = _.sortBy(
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

  response.send(200).json(competencies);
}

async function setSecondLangProfs(request, response) {
  const { data } = request.body;
  const userId = getKeycloakUserId(request);

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
        competencies: {
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
