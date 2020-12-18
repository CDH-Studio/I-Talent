const prisma = require("../../database");

async function updateVisibilityCards(request, response) {
  const {
    info,
    talentManagement,
    skills,
    competencies,
    developmentalGoals,
    description,
    officialLanguage,
    qualifiedPools,
    education,
    experience,
    careerInterests,
    mentorshipSkills,
    exFeeder,
    employmentEquityGroup,
  } = request.body;
  const { userId } = request.params;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      visibleCards: {
        update: {
          info,
          talentManagement,
          skills,
          competencies,
          developmentalGoals,
          description,
          officialLanguage,
          qualifiedPools,
          education,
          experience,
          careerInterests,
          mentorshipSkills,
          exFeeder,
          employmentEquityGroup,
        },
      },
    },
  });

  response.sendStatus(201);
}

module.exports = {
  updateVisibilityCards,
};
