const prisma = require("../../../database");

async function getClassifications(request, response) {
  try {
    const classificationsQuery = await prisma.opClassification.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    response.status(200).json(classificationsQuery);
  } catch (error) {
    console.log(error);
    response.status(500).send("Error fetching classification options");
  }
}

module.exports = {
  getClassifications,
};
