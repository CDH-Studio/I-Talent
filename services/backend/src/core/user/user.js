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

module.exports = {
  getCurrentUser,
  createUser,
};
