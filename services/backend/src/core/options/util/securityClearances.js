const { validationResult } = require("express-validator");
const _ = require("lodash");
const prisma = require("../../../database");

async function getSecurityClearances(request, response) {
  try {
    validationResult(request).throw();

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
