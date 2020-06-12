const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getClassifications(request, response) {
  try {
    const classificationsQuery = await prisma.opClassifications.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    response.status(200).json(classificationsQuery);
  } catch (error) {
    response.status(500).send("Error fetching classification options");
  }
}

module.exports = {
  getClassifications,
};
