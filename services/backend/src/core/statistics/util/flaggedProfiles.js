const prisma = require("../../../database");

async function getHiddenUsers(request, response) {
  try {
    const hiddenUsers = await prisma.user.findMany({
      where: {
        status: "HIDDEN",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    response.status(200).json(hiddenUsers);
  } catch (error) {
    console.log(error);
    response.status(500).send("Error fetching hidden users");
  }
}

module.exports = {
  getHiddenUsers,
};
