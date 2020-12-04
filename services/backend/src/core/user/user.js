const _ = require("lodash");
const prisma = require("../../database");
const {
  manageUsers,
  isKeycloakUser,
  getKeycloakUserId,
} = require("../../utils/keycloak");

function generateAvatarColor() {
  const colours = [
    "#0bdaa3",
    "#da680b",
    "#7a0bda",
    "#2a0bda",
    "#c20bda",
    "#da0b3f",
    "#8e44ad",
    "#98ad44",
    "#ad4497",
    "#ad5944",
    "#ad4463",
  ];
  return colours[_.random(colours.length - 1)];
}

function getNameInitials(firstName, lastName) {
  return `${firstName[0]}${lastName[0]}`;
}

async function getCurrentUser(request, response) {
  const id = getKeycloakUserId(request);

  const user = await prisma.user.findOne({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      avatarColor: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
      signupStep: true,
      preferredLanguage: true,
    },
  });

  if (user) {
    response.status(200).json({
      ...user,
      nameInitials: getNameInitials(user.firstName, user.lastName),
    });
  } else {
    response.sendStatus(404);
  }
}

async function createUser(request, response) {
  const { name, firstName, lastName, email } = request.body;
  const id = getKeycloakUserId(request);

  const user = await prisma.user.create({
    data: {
      id,
      name,
      email,
      firstName: _.upperFirst(firstName),
      lastName: _.upperFirst(lastName),
      avatarColor: generateAvatarColor(),
      visibleCards: { create: {} },
    },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      avatarColor: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
      signupStep: true,
    },
  });

  response.status(200).json({
    ...user,
    nameInitials: getNameInitials(user.firstName, user.lastName),
  });
}

async function deleteUser(request, response) {
  const { id } = request.params;

  if (manageUsers(request) || isKeycloakUser(request, id)) {
    await prisma.$transaction([
      prisma.competency.deleteMany({ where: { userId: id } }),
      prisma.mentorshipSkill.deleteMany({ where: { userId: id } }),
      prisma.skill.deleteMany({ where: { userId: id } }),
      prisma.developmentalGoal.deleteMany({ where: { userId: id } }),
      prisma.secondLangProf.deleteMany({ where: { userId: id } }),
      prisma.organization.deleteMany({ where: { userId: id } }),
      prisma.education.deleteMany({ where: { userId: id } }),
      prisma.qualifiedPool.deleteMany({ where: { userId: id } }),
      prisma.experience.deleteMany({ where: { userId: id } }),
      prisma.relocationLocation.deleteMany({ where: { userId: id } }),
      prisma.user.delete({ where: { id } }),
    ]);
    response.sendStatus(200);
  } else {
    response.sendStatus(403);
  }
}

module.exports = {
  getCurrentUser,
  createUser,
  deleteUser,
};
