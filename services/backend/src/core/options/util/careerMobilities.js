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

  const responseData = careerMobilityQuery.map((i) => ({
    value: i.opCareerMobilityId,
    label: i.description,
  }));

  response.status(200).json(responseData);
}

module.exports = {
  getCareerMobilities,
};
