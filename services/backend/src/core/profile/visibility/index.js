const prisma = require("../../../database");
const { getKeycloakUserId } = require("../../../utils/keycloak");

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
  const userId = getKeycloakUserId(request);

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

async function getVisibilityCards(request, response) {
  const userId = getKeycloakUserId(request);

  const { visibleCards } = await prisma.user.findOne({
    where: {
      id: userId,
    },
    select: {
      visibleCards: {},
    },
  });

  response.send(200).json(visibleCards);
}

module.exports = {
  updateVisibilityCards,
  getVisibilityCards,
};
