const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getTalentMatrixResults(request, response) {
  try {
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
    response.status(500).send("Error fetching talentMatrixResult options");
  }
}

module.exports = {
  getTalentMatrixResults,
};
