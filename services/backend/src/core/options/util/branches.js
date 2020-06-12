const _ = require("lodash");
const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getBranches(request, response) {
  try {
    const { language } = request.query;

    const branchesQuery = await prisma.transEploymentInfos.findMany({
      where: {
        language,
      },
      select: {
        id: true,
        branch: true,
      },
      orderBy: {
        branch: "asc",
      },
    });

    const branches = _.uniq(branchesQuery.map((i) => i.branch));

    response.status(200).json(branches);
  } catch (error) {
    response.status(500).send("Error fetching branch options");
  }
}

module.exports = {
  getBranches,
};
