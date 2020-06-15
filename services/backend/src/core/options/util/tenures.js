const { validationResult } = require("express-validator");
const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getTenures(request, response) {
  try {
    validationResult(request).throw();

    const { language } = request.query;

    const tenuresQuery = await prisma.opTransTenures.findMany({
      where: {
        language,
      },
      select: {
        opTenuresId: true,
        name: true,
      },
    });

    const tenures = tenuresQuery.map((i) => {
      return {
        id: i.opTenuresId,
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
