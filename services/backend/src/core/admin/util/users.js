const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

const getUsers = async (request, response) => {
  try {
    const { language } = request.query;

    const usersQuery = await prisma.users.findMany({
      select: {
        id: true,
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
    });

    const users = usersQuery.map((i) => {
      const jobTitle = i.employmentInfo.translations;
      const tenure = i.tenure.translations;

      return {
        id: i.id,
        firstName: i.firstName,
        lastName: i.lastName,
        status: i.status,
        jobTitle: jobTitle.length > 0 ? jobTitle[0] : undefined,
        tenure: tenure.length > 0 ? tenure[0] : undefined,
      };
    });

    response.status(200).json(users);
  } catch (error) {
    response.status(500).send("Error getting information about the users");
  }
};

const updateUserStatuses = async (request, response) => {
  try {
    const userIds = Object.keys(request.body);

    await Promise.all(
      userIds.map(async (userId) => {
        await prisma.users.update({
          where: {
            id: userId,
          },
          data: {
            status: request.body[userId],
          },
        });
      })
    );

    response.status(200).send("Successfully updated the user statuses");
  } catch (error) {
    response.status(500).send("Error updating the user statuses");
  }
};

module.exports = { getUsers, updateUserStatuses };
