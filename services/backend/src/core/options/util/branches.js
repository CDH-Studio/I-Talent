const _ = require("lodash");
const { validationResult } = require("express-validator");
const prisma = require("../../../database");

async function getBranches(request, response) {
  try {
    validationResult(request).throw();

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
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error fetching branch options");
  }
}

module.exports = {
  getBranches,
};
