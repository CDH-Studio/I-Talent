const _ = require("lodash");
const prisma = require("../../../../database");

const generateRelocationLocationsFromOfficeLocations = async () => {
  const locationsQuery = await prisma.opTransOfficeLocation.findMany({
    select: {
      province: true,
      language: true,
      opOfficeLocationId: true,
      opOfficeLocation: {
        select: {
          city: true,
        },
      },
    },
    orderBy: {
      province: "asc",
    },
  });

  const locations = _.orderBy(
    locationsQuery.map((i) => {
      const { province, language, opOfficeLocationId } = i;
      const { city } = i.opOfficeLocation;

      return {
        opOfficeLocationId,
        language,
        city,
        province,
      };
    }),
    ["opOfficeLocationId", "province", "city"]
  );

  const uniqLocations = _.uniqWith(
    locations,
    (val1, val2) =>
      val1.city === val2.city &&
      val1.province === val2.province &&
      val1.language === val2.language
  );

  const data = [];
  for (let i = 0; i * 2 < uniqLocations.length; i += 1) {
    data.push([uniqLocations[i * 2], uniqLocations[i * 2 + 1]]);
  }

  return data;
};

module.exports = generateRelocationLocationsFromOfficeLocations;
