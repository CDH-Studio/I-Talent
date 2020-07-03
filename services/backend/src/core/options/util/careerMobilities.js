const { validationResult } = require("express-validator");
const _ = require("lodash");
const prisma = require("../../../database");

async function getCareerMobilities(request, response) {
  try {
    validationResult(request).throw();

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
