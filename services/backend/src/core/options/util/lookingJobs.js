const { validationResult } = require("express-validator");
const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getLookingJobs(request, response) {
  try {
    validationResult(request).throw();

    const { language } = request.query;

    const lookingJobsQuery = await prisma.opTransLookingJobs.findMany({
      where: {
        language,
      },
      select: {
        opLookingJobsId: true,
        description: true,
      },
    });

    const lookingJobs = lookingJobsQuery.map((i) => {
      return {
        id: i.opLookingJobsId,
        description: i.description,
      };
    });

    response.status(200).json(lookingJobs);
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error fetching lookinJob options");
  }
}

module.exports = {
  getLookingJobs,
};
