const _ = require("lodash");
const prisma = require("../../database");

async function getBranches(request, response) {
  const { language } = request.query;

  const branchesQuery = await prisma.transEmploymentInfo.findMany({
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

  const branches = _.sortBy(_.uniq(branchesQuery.map((i) => i.branch)));

  response.status(200).json(branches);
}

module.exports = {
  getBranches,
};
