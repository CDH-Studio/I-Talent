const { PrismaClient } = require("../../database/client");

const prisma = new PrismaClient();

async function updateProfile(request, response) {
  const { id } = request.params;
  const { body } = request;
  const profile = {
    firstName: body.firstName,
    lastName: body.lastName,
    team: body.team,
    telephone: body.telephone,
    cellphone: body.cellphone,
    linkedin: body.linkedin,
    github: body.github,
    gcconnex: body.gcconnex,
    manager: body.manager,
    firstLanguage: body.firstLanguage,
    secondLanguage: body.secondLanguage,
    preferredLanguage: body.preferredLanguage,
    actingStartDate: body.actingStartDate,
    actingEndDate: body.actingEndDate,
    interestedInRemote: body.interestedInRemote,
    exFeeder: body.exFeeder,
    mentoring: body.isMentor,

    // Find where these occur once we start working on frontend
    // actingLevel: null,
    // employmentInfo: null,
    // projects: null,
    // status: body.status,

    officeLocation: { connect: { id: body.locationId } },
    careerMobility: { connect: { id: body.careerMobilityId } },
    tenure: { connect: { id: body.tenureId } },
    securityClearance: { connect: { id: body.securityClearanceId } },
    lookingJob: { connect: { id: body.lookingForANewJobId } },
    talentMatrixResult: { connect: { id: body.talentMatrixResultId } },
    groupLevel: { connect: { id: body.groupLevelId } },
  };
  prisma.users
    .update({ where: { id }, data: { profile } })
    .then((result) => response.status(200).json(result))
    .catch((error) => {
      console.log(error);
      response.status(500).json("Unable to create profiles");
    });
}

async function getProfileStatusById(request, response) {
  const { id } = request.params;
  try {
    const getProfileFromDB = await prisma.users.findOne({ where: { id: id } });
    response.status(200).json({
      profile: { exists: !!getProfileFromDB },
    });
  } catch (error) {
    console.log(error);
    response.status(500).json("Unable to create profiles");
  }
}

async function getPrivateProfileById(request, response) {
  const { id } = request.params;
  prisma.users
    .findOne({
      where: { id: id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        groupLevelId: true,
        actingLevelId: true,
        securityClearanceId: true,
        lookingJobId: true,
        tenureId: true,
        careerMobilityId: true,
        employmentInfoId: true,
        talentMatrixResultId: true,
        officeLocationId: true,
        visibleCardId: true,
        name: true,
        nameInitials: true,
        firstName: true,
        lastName: true,
        avatarColor: true,
        email: true,
        telephone: true,
        cellphone: true,
        manager: true,
        team: true,
        firstLanguage: true,
        secondLanguage: true,
        preferredLanguage: true,
        actingStartDate: true,
        actingEndDate: true,
        linkedin: true,
        github: true,
        gcconnex: true,
        exFeeder: true,
        mentoring: true,
        interestedInRemote: true,
        status: true,
        projects: true,
        groupLevel: true,
        actingLevel: true,
        securityClearance: true,
        lookingJob: true,
        tenure: true,
        careerMobility: true,
        employmentInfo: true,
        talentMatrixResult: true,
        officeLocation: true,
        visibleCards: true,
        mentorshipSkills: true,
        skills: true,
        developmentalGoals: true,
        competencies: true,
        secondLangProfs: true,
        organizations: true,
        educations: true,
        experiences: true,
        relocationLocations: true,
      },
    })
    .then((result) => response.status(200).json(result))
    .catch((error) => {
      console.log(error);
      response.status(500).json("Unable to get profile");
    });
}

// map visible cards
async function getPublicProfileById(request, response) {
  const { id } = request.params;
  prisma.users
    .findOne({
      where: { id: id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        groupLevelId: true,
        actingLevelId: true,
        securityClearanceId: true,
        lookingJobId: true,
        tenureId: true,
        careerMobilityId: true,
        employmentInfoId: true,
        talentMatrixResultId: true,
        officeLocationId: true,
        visibleCardId: true,
        name: true,
        nameInitials: true,
        firstName: true,
        lastName: true,
        avatarColor: true,
        email: true,
        telephone: true,
        cellphone: true,
        manager: true,
        team: true,
        firstLanguage: true,
        secondLanguage: true,
        preferredLanguage: true,
        actingStartDate: true,
        actingEndDate: true,
        linkedin: true,
        github: true,
        gcconnex: true,
        exFeeder: true,
        mentoring: true,
        interestedInRemote: true,
        status: true,
        projects: true,
        groupLevel: true,
        actingLevel: true,
        securityClearance: true,
        lookingJob: true,
        tenure: true,
        careerMobility: true,
        employmentInfo: true,
        talentMatrixResult: true,
        officeLocation: true,
        visibleCards: true,
        mentorshipSkills: true,
        skills: true,
        developmentalGoals: true,
        competencies: true,
        secondLangProfs: true,
        organizations: true,
        educations: true,
        experiences: true,
        relocationLocations: true,
      },
    })
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json("Unable to get profile");
    });
}

module.exports = {
  updateProfile,
  getPublicProfileById,
  getPrivateProfileById,
  getProfileStatusById,
};
