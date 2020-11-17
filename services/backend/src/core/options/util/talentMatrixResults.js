const _ = require("lodash");
const prisma = require("../../../database");

async function getTalentMatrixResults(request, response) {
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
}

module.exports = {
  getTalentMatrixResults,
};
