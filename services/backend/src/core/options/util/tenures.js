const { validationResult } = require("express-validator");
const prisma = require("../../../database");

async function getTenures(request, response) {
  try {
    validationResult(request).throw();

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

    const tenures = tenuresQuery.map((i) => {
      return {
        id: i.opTenureId,
        name: i.name,
      };
    });

    response.status(200).json(tenures);
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error fetching tenure options");
  }
}

module.exports = {
  getTenures,
};
