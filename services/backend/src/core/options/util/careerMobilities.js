const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getCareerMobilities(request, response) {
  try {
    const { language } = request.query;

    const careerMobilitiesQuery = await prisma.opTransCareerMobilities.findMany(
      {
        where: {
          language,
        },
        select: {
          opCareerMobilitiesId: true,
          description: true,
        },
      }
    );

    const careerMobilities = careerMobilitiesQuery.map((i) => {
      return {
        id: i.opCareerMobilitiesId,
        description: i.description,
      };
    });

    response.status(200).json(careerMobilities);
  } catch (error) {
    response.status(500).send("Error fetching careerMobility options");
  }
}

module.exports = {
  getCareerMobilities,
};
