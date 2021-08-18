const _ = require("lodash");
const prisma = require("../../../database");

async function getBranches(request, response) {
  const { language } = request.query;

  const branchesQuery = await prisma.transEmploymentInfo.findMany({
    where: {
      language,
    },
    select: {
      branch: true,
      employmentInfo: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      branch: "asc",
    },
  });

  const branchesQueryUniq = _.sortedUniqBy(branchesQuery, "branch");

  const responseData = branchesQueryUniq.map((branch) => ({
    label: branch.branch,
    value: branch.employmentInfo.id,
  }));

  response.status(200).json(responseData);
}

module.exports = {
  getBranches,
};
