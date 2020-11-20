const _ = require("lodash");
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

  const locations = _.orderBy(
    locationsQuery.map((i) => {
      const { province, city, opRelocationLocationId } = i;
      return {
        id: opRelocationLocationId,
        city,
        province,
      };
    }),
    ["province", "city"]
  );

  response.status(200).json(locations);
}

module.exports = {
  getCityLocations,
};
