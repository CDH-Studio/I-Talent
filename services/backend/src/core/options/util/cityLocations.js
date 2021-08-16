const prisma = require("../../../database");

async function getCityLocations(request, response) {
  const { language } = request.query;

  const locationsQuery = await prisma.opTransRelocationLocation.findMany({
    where: {
      language,
    },
    select: {
      opRelocationLocationId: true,
      province: true,
      city: true,
    },
    orderBy: {
      province: "asc",
    },
  });

  const responseData = locationsQuery.map(
    ({ province, city, opRelocationLocationId }) => ({
      value: opRelocationLocationId,
      label: `${city}, ${province}`,
    })
  );

  response.status(200).json(responseData);
}

module.exports = {
  getCityLocations,
};
