const prisma = require("../../../database");

async function getTenures(request, response) {
  const { language } = request.query;

  const tenuresQuery = await prisma.opTransTenure.findMany({
    where: {
      language,
    },
    select: {
      opTenureId: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  const tenures = tenuresQuery.map((tenure) => ({
    label: tenure.name,
    value: tenure.opTenureId,
  }));

  response.status(200).json(tenures);
}

module.exports = {
  getTenures,
};
