const { validationResult } = require("express-validator");
const _ = require("lodash");
const prisma = require("../../../database");

async function getTalentMatrixResults(request, response) {
  try {
    validationResult(request).throw();

    const { language } = request.query;

    const talentMatrixResultsQuery = await prisma.opTransTalentMatrixResult.findMany(
      {
        where: {
          language,
        },
        select: {
          opTalentMatrixResultId: true,
          description: true,
        },
        orderBy: {
          description: "asc",
        },
      }
    );

    const talentMatrixResults = _.sortBy(
      talentMatrixResultsQuery.map((i) => ({
        id: i.opTalentMatrixResultId,
        description: i.description,
      })),
      "description"
    );

    response.status(200).json(talentMatrixResults);
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error fetching talentMatrixResult options");
  }
}

module.exports = {
  getTalentMatrixResults,
};
