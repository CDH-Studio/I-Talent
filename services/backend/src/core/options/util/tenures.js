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
    value: tenure.opTenureId,
    label: tenure.name,
  }));

  response.status(200).json(tenures);
}

module.exports = {
  getTenures,
};
