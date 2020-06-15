const { validationResult } = require("express-validator");
const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getTalentMatrixResults(request, response) {
  try {
    validationResult(request).throw();

    const { language } = request.query;

    const talentMatrixResultsQuery = await prisma.opTransTalentMatrixResults.findMany(
      {
        where: {
          language,
        },
        select: {
          opTalentMatrixResultsId: true,
          description: true,
        },
      }
    );

    const talentMatrixResults = talentMatrixResultsQuery.map((i) => {
      return {
        id: i.opTalentMatrixResultsId,
        description: i.description,
      };
    });

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
