const { validationResult } = require("express-validator");
const _ = require("lodash");
const prisma = require("../../../database");

async function getCityLocations(request, response) {
  try {
    validationResult(request).throw();

    const { language } = request.query;

    const locationsQuery = await prisma.opTransCityLocation.findMany({
      where: {
        language,
      },
      select: {
        id: true,
        province: true,
        city: true,
      },
      orderBy: {
        province: "asc",
      },
    });

    const locations = _.orderBy(
      locationsQuery.map((i) => {
        const { province, city } = i;
        return {
          city,
          province,
        };
      }),
      ["province", "city"]
    );

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
  getCityLocations,
};
