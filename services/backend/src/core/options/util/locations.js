const _ = require("lodash");
const prisma = require("../../../database");

async function getLocations(request, response) {
  const { language } = request.query;

  const locationsQuery = await prisma.opTransOfficeLocation.findMany({
    where: {
      language,
    },
    select: {
      streetName: true,
      province: true,
      opOfficeLocation: {
        select: {
          id: true,
          streetNumber: true,
          city: true,
        },
      },
    },
    orderBy: {
      province: "asc",
    },
  });

  console.log("locationsQuery", locationsQuery);

  const locations = _.orderBy(
    locationsQuery.map((i) => {
      const { streetName, province } = i;
      const { id, city, streetNumber } = i.opOfficeLocation;

      return {
        label: `${streetNumber} ${streetName}, ${city}, ${province}`,
        value: id,
      };
    }),
    ["province", "city", "streetNumber", "streetName"]
  );

  response.status(200).json(locations);
}

module.exports = {
  getLocations,
};
