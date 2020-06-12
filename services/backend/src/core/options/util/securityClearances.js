const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getSecurityClearances(request, response) {
  try {
    const { language } = request.query;

    const securityClearancesQuery = await prisma.opTransSecurityClearances.findMany(
      {
        where: {
          language,
        },
        select: {
          opSecurityClearancesId: true,
          description: true,
        },
      }
    );

    const securityClearances = securityClearancesQuery.map((i) => {
      return {
        id: i.opSecurityClearancesId,
        description: i.description,
      };
    });

    response.status(200).json(securityClearances);
  } catch (error) {
    response.status(500).send("Error fetching securityClearance options");
  }
}

module.exports = {
  getSecurityClearances,
};
