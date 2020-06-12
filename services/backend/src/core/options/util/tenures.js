const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getTenures(request, response) {
  try {
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
    response.status(500).send("Error fetching tenure options");
  }
}

module.exports = {
  getTenures,
};
