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
    label: i.description,
    value: i.opCareerMobilityId,
  }));

  response.status(200).json(responseData);
}

module.exports = {
  getCareerMobilities,
};
