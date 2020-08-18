const { validationResult } = require("express-validator");
const _ = require("lodash");
const prisma = require("../../../database");

async function getLocations(request, response) {
  try {
    validationResult(request).throw();

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

    const locations = _.orderBy(
      locationsQuery.map((i) => {
        const { streetName, province } = i;
        const { id, city, streetNumber } = i.opOfficeLocation;

        return {
          id,
          streetNumber,
          streetName,
          city,
          province,
        };
      }),
      ["province", "city", "streetNumber", "streetName"]
    );

    const locationsQuery2 = await prisma.opTransOfficeLocation.findMany({
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

    const locations2 = _.orderBy(
      locationsQuery2.map((i) => {
        //console.log("IIIIIIIIIIIIIIIII", locationsQuery2);
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

    const printt = _.uniqWith(
      locations2,
      (val1, val2) =>
        val1.city === val2.city &&
        val1.province === val2.province &&
        val1.language === val2.language
    );

    console.log(printt, "LOCAITONSSSSSSSSSSSSSSS");

    response.status(200).json(locations);
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error fetching location options");
  }
}

module.exports = {
  getLocations,
};
