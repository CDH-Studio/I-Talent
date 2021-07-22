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
      value: securityClearance.opSecurityClearanceId,
      label: securityClearance.description,
    })
  );

  response.status(200).json(securityClearances);
}

module.exports = {
  getSecurityClearances,
};
