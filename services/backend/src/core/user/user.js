const { validationResult } = require("express-validator");
const prisma = require("../../database");

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
  return colours[Math.floor(Math.random() * colours.length)];
}

function getNameInitials(firstName, lastName) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
}

async function getUserById(request, response) {
  try {
    validationResult(request).throw();

    const { id } = request.params;

    if (request.kauth.grant.access_token.content.sub === id) {
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
        user.nameInitials = getNameInitials(user.firstName, user.lastName);
      }

      response.status(200).json(user);
      return;
    }

    response
      .status(403)
      .json({ data: "Access to private account has be denied." });
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).json("Unable to get profile");
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function createUser(request, response) {
  try {
    validationResult(request).throw();

    const { name, firstName, lastName, email } = request.body;
    const { id } = request.params;

    if (request.kauth.grant.access_token.content.sub === id) {
      const user = await prisma.user.create({
        data: {
          id,
          name,
          email,
          firstName: capitalizeFirstLetter(firstName),
          lastName: capitalizeFirstLetter(lastName),
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
        nameInitials: getNameInitials(firstName, lastName),
      });
      return;
    }
    response
      .status(403)
      .json({ data: "Access to private account has be denied." });
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).json("Unable to create profiles");
  }
}

module.exports = {
  getUserById,
  createUser,
};
