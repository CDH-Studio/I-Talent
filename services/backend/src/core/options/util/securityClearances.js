const { validationResult } = require("express-validator");
const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getSecurityClearances(request, response) {
  try {
    validationResult(request).throw();

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
        orderBy: {
          description: "asc",
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
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error fetching securityClearance options");
  }
}

module.exports = {
  getSecurityClearances,
};
