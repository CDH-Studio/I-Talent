const _ = require("lodash");
const prisma = require("../../../database");

async function getCareerMobilities(request, response) {
  const { language } = request.query;

  const careerMobilityQuery = await prisma.opTransCareerMobility.findMany({
    where: {
      language,
    },
    select: {
      opCareerMobilityId: true,
      description: true,
    },
    orderBy: {
      description: "asc",
    },
  });

  const careerMobility = _.sortBy(
    careerMobilityQuery.map((i) => ({
      id: i.opCareerMobilityId,
      description: i.description,
    })),
    "description"
  );

  response.status(200).json(careerMobility);
}

module.exports = {
  getCareerMobilities,
};
