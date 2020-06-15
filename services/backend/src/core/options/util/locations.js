const { validationResult } = require("express-validator");
const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getLocations(request, response) {
  try {
    validationResult(request).throw();

    const { language } = request.query;

    const locationsQuery = await prisma.opTransOfficeLocations.findMany({
      where: {
        language,
      },
      select: {
        streetName: true,
        province: true,
        opOfficeLocations: {
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

    const locations = locationsQuery.map((i) => {
      const { streetName, province } = i;
      const { id, city, streetNumber } = i.opOfficeLocations;

      return {
        id,
        streetNumber,
        streetName,
        city,
        province,
      };
    });

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
