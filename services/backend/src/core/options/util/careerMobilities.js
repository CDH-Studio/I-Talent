const { validationResult } = require("express-validator");
const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getCareerMobilities(request, response) {
  try {
    validationResult(request).throw();

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
        orderBy: {
          description: "asc",
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
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error fetching careerMobility options");
  }
}

module.exports = {
  getCareerMobilities,
};
