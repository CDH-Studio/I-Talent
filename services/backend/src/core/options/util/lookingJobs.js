const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getLookingJobs(request, response) {
  try {
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
    response.status(500).send("Error fetching lookinJob options");
  }
}

module.exports = {
  getLookingJobs,
};
