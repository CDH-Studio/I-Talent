const _ = require("lodash");
const prisma = require("../../database");

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

  const classifications = _.sortBy(classificationsQuery, "name");

  response.status(200).json(classifications);
}

module.exports = {
  getClassifications,
};
