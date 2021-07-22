const prisma = require("../../../database");

async function getClassifications(_request, response) {
  const classificationsQuery = await prisma.opClassification.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  const responseData = classificationsQuery.map((classification) => ({
    value: classification.id,
    label: classification.name,
  }));

  response.status(200).json(responseData);
}

module.exports = {
  getClassifications,
};
