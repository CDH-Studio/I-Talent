const prisma = require("../../../database");

async function getLookingJobs(request, response) {
  const { language } = request.query;

  const lookingJobsQuery = await prisma.opTransLookingJob.findMany({
    where: {
      language,
    },
    select: {
      opLookingJobId: true,
      description: true,
    },
    orderBy: {
      description: "asc",
    },
  });

  const lookingJobs = lookingJobsQuery.map((i) => ({
    id: i.opLookingJobId,
    description: i.description,
  }));

  response.status(200).json(lookingJobs);
}

module.exports = {
  getLookingJobs,
};
