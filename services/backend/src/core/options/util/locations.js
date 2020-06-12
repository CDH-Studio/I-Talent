const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getLocations(request, response) {
  try {
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
    response.status(500).send("Error fetching location options");
  }
}

module.exports = {
  getLocations,
};
