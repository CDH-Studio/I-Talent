const _ = require("lodash");
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

  const tenures = _.sortBy(
    tenuresQuery.map((i) => ({
      id: i.opTenureId,
      name: i.name,
    })),
    "name"
  );

  response.status(200).json(tenures);
}

module.exports = {
  getTenures,
};
