const prisma = require("../../../database");

async function getSecurityClearances(request, response) {
  const { language } = request.query;

  const securityClearancesQuery =
    await prisma.opTransSecurityClearance.findMany({
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
    });

  const securityClearances = securityClearancesQuery.map(
    (securityClearance) => ({
      label: securityClearance.description,
      value: securityClearance.opSecurityClearanceId,
    })
  );

  response.status(200).json(securityClearances);
}

module.exports = {
  getSecurityClearances,
};
