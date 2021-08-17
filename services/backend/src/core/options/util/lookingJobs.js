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

  const responseData = lookingJobsQuery.map((i) => ({
    value: i.opLookingJobId,
    label: i.description,
  }));
  response.status(200).json(responseData);
}

module.exports = {
  getLookingJobs,
};
