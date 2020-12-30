const _ = require("lodash");
const prisma = require("../../database");

async function getSecurityClearances(request, response) {
  const { language } = request.query;

  const securityClearancesQuery = await prisma.opTransSecurityClearance.findMany(
    {
      where: {
        language,
      },
      select: {
        opSecurityClearanceId: true,
        description: true,
      },
      orderBy: {
        description: "asc",
      },
    }
  );

  const securityClearances = _.sortBy(
    securityClearancesQuery.map((i) => ({
      id: i.opSecurityClearanceId,
      description: i.description,
    })),
    "description"
  );

  response.status(200).json(securityClearances);
}

module.exports = {
  getSecurityClearances,
};
