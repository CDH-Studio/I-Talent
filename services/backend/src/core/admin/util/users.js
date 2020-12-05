const _ = require("lodash");
const prisma = require("../../../database");

const getUsers = async (request, response) => {
  const { language } = request.query;

  const usersQuery = await prisma.user.findMany({
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      firstName: true,
      lastName: true,
      status: true,
      employmentInfo: {
        select: {
          translations: {
            where: {
              language: language,
            },
            select: {
              jobTitle: true,
            },
          },
        },
      },
      tenure: {
        select: {
          translations: {
            where: {
              language,
            },
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      firstName: "asc",
    },
  });

  const users = usersQuery.map((i) => {
    const jobTitle = i.employmentInfo ? i.employmentInfo.translations : [];
    const tenure = i.tenure ? i.tenure.translations : [];

    return {
      id: i.id,
      createdAt: i.createdAt,
      updatedAt: i.updatedAt,
      firstName: i.firstName,
      lastName: i.lastName,
      status: i.status,
      jobTitle: jobTitle.length > 0 ? jobTitle[0].jobTitle : undefined,
      tenure: tenure.length > 0 ? tenure[0].name : undefined,
    };
  });

  const sortedUsers = _.orderBy(users, ["firstName", "lastName", "status"]);

  response.status(200).json(sortedUsers);
};

const updateUserStatuses = async (request, response) => {
  const userIds = Object.keys(request.body);

  await Promise.all(
    userIds.map((userId) =>
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          status: request.body[userId],
        },
      })
    )
  );

  response.sendStatus(204);
};

module.exports = { getUsers, updateUserStatuses };
